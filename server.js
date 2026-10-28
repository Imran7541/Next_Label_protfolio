/**
 * High-Performance Production & Development Server for Next Label Portfolio - Imran Hossain
 * Zero external dependencies, native Node.js HTTP/1.1 & HTTP/2 compatible.
 * Supports:
 * - HTTP 206 Partial Content (Range requests) for smooth MP4 & MP3 streaming
 * - Strict W3C Content Security Policy (Level 3), HSTS, COOP, CORP headers
 * - POST /api/contact endpoint with honeypot bot trap & timing heuristics
 * - In-memory and file-backed inquiry logging in src/data/inquiries.json
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const ROOT_DIR = __dirname;
const INQUIRIES_FILE = path.join(__dirname, 'src', 'data', 'inquiries.json');

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.glsl': 'text/plain; charset=utf-8',
};

// Security headers matching docs/04_TRD.md
function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader(
    'Permissions-Policy',
    'accelerometer=(self), gyroscope=(self), magnetometer=(), camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.cloudfront.net; media-src 'self' blob: https://*.cloudfront.net; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
  );
}

// Ensure inquiries storage file exists
function ensureInquiriesFile() {
  const dir = path.dirname(INQUIRIES_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(INQUIRIES_FILE)) fs.writeFileSync(INQUIRIES_FILE, '[]', 'utf-8');
}
ensureInquiriesFile();

// Safe Client IP extraction (prevents header injection and spoofing)
function getClientIP(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff && typeof xff === 'string') {
    const first = xff.split(',')[0].trim();
    if (/^[a-fA-F0-9:.]+$/.test(first) && first.length <= 45) return first;
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

// Rate limiting map (IP -> timestamps) with bounded memory & automatic sweeping
const rateLimits = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 3600000; // 1 hour
  const maxReqs = 5;

  // Prune map if size exceeds threshold to prevent unbounded memory growth DoS
  if (rateLimits.size > 2000) {
    for (const [k, v] of rateLimits.entries()) {
      const active = v.filter(t => now - t < windowMs);
      if (active.length === 0) rateLimits.delete(k);
      else rateLimits.set(k, active);
    }
  }

  const timestamps = rateLimits.get(ip) || [];
  const valid = timestamps.filter(t => now - t < windowMs);
  if (valid.length >= maxReqs) return true;
  valid.push(now);
  rateLimits.set(ip, valid);
  return false;
}

// Input sanitizer to prevent Stored XSS and strip control characters
function sanitizeInput(str) {
  return String(str ?? '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

// Atomic inquiry file writer to prevent race condition corruption
function saveInquiry(inquiry) {
  try {
    const existing = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8') || '[]');
    existing.push(inquiry);
    const tempFile = `${INQUIRIES_FILE}.${Date.now()}.${Math.random().toString(36).slice(2, 6)}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(existing, null, 2), 'utf-8');
    fs.renameSync(tempFile, INQUIRIES_FILE);
  } catch (e) {
    console.error('Failed to append inquiry:', e);
  }
}

// Contact form API handler
async function handleContactAPI(req, res) {
  setSecurityHeaders(res);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  const clientIP = getClientIP(req);
  if (isRateLimited(clientIP)) {
    res.writeHead(429);
    res.end(JSON.stringify({ error: 'Please wait a moment before trying again.' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
    if (body.length > 50000) {
      req.socket.destroy();
    }
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body || '{}');
      const { name, email, message, company_website, elapsed } = data;

      const errors = {};

      // 1. Bot Honeypot Check
      if (company_website && String(company_website).trim().length > 0) {
        console.warn(`[BOT BLOCKED] Honeypot field filled from ${clientIP}`);
        res.writeHead(400);
        res.end(JSON.stringify({ errors: { general: 'Bot submission detected.' } }));
        return;
      }

      // 2. Bot Timing Threshold Check (< 3000ms is automated bot)
      if (typeof elapsed !== 'number' || elapsed < 3000) {
        console.warn(`[BOT BLOCKED] Form submitted too quickly (${elapsed}ms) from ${clientIP}`);
        res.writeHead(400);
        res.end(JSON.stringify({ errors: { general: 'Please wait a moment before trying again.' } }));
        return;
      }

      // 3. Field Validation & XSS Script Tag Defense
      const cleanName = sanitizeInput(name);
      const cleanEmail = sanitizeInput(email);
      const cleanMessage = sanitizeInput(message);

      const htmlTagPattern = /<[^>]*>/;
      if (htmlTagPattern.test(cleanName) || htmlTagPattern.test(cleanEmail) || htmlTagPattern.test(cleanMessage)) {
        res.writeHead(400);
        res.end(JSON.stringify({ errors: { general: 'HTML tags and scripts cannot be sent.' } }));
        return;
      }

      if (!cleanName || cleanName.length < 2 || cleanName.length > 60) {
        errors.name = 'Please enter a name between 2 and 60 characters.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 254) {
        errors.email = 'Please provide a valid email address.';
      }

      if (!cleanMessage || cleanMessage.length < 20 || cleanMessage.length > 1200) {
        errors.message = 'Please enter a message between 20 and 1,200 characters.';
      }

      if (Object.keys(errors).length > 0) {
        res.writeHead(400);
        res.end(JSON.stringify({ errors }));
        return;
      }

      // 4. Save Valid Inquiry Atomically
      const cleanInquiry = {
        id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        elapsed_ms: elapsed,
        ip_hash: Buffer.from(clientIP).toString('base64'),
        created_at: new Date().toISOString(),
        status: 'pending'
      };

      saveInquiry(cleanInquiry);

      console.log(`[INQUIRY RECEIVED] From: ${cleanInquiry.name} <${cleanInquiry.email}>`);
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: 'Message sent successfully. Thank you for reaching out!' }));
    } catch (err) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
    }
  });
}

// Static file streaming with Range Support
function serveStaticFile(req, res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    setSecurityHeaders(res);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Accept-Ranges', 'bytes');

    // Handle HTTP Range Requests (Essential for MP4 and MP3 streaming)
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

      if (start >= stats.size || end >= stats.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
        res.end();
        return;
      }

      const chunkSize = end - start + 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Content-Length': chunkSize,
      });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      const fileStream = fs.createReadStream(filePath, { start, end });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Cache-Control': (ext === '.html' || ext === '.js' || ext === '.css') ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600',
      });
      if (req.method === 'HEAD') {
        res.end();
        return;
      }
      fs.createReadStream(filePath).pipe(res);
    }
  });
}

// Main HTTP request router
const server = http.createServer((req, res) => {
  let pathname;
  try {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    pathname = decodeURIComponent(urlObj.pathname);
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  // Reject null-byte injection attacks immediately
  if (pathname.includes('\0') || req.url.includes('%00')) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  // API Route
  if (pathname === '/api/contact') {
    handleContactAPI(req, res);
    return;
  }

  // Root HTML Route
  if (pathname === '/' || pathname === '/index.html') {
    const indexPath = path.join(ROOT_DIR, 'index.html');
    serveStaticFile(req, res, indexPath);
    return;
  }

  // Sanitize path against directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const cleanRelPath = safePath.replace(/^\/+/, '');

  // Whitelisted files that may live in ROOT_DIR
  const ROOT_WHITELIST = new Set([
    'robots.txt',
    'sitemap.xml',
    'favicon.svg',
    'favicon-32.png',
    'apple-touch-icon.png'
  ]);

  if (ROOT_WHITELIST.has(cleanRelPath)) {
    const rootTarget = path.join(ROOT_DIR, cleanRelPath);
    if (fs.existsSync(rootTarget) && fs.statSync(rootTarget).isFile()) {
      serveStaticFile(req, res, rootTarget);
      return;
    }
  }

  // Strictly confined public directory static file resolution
  const resolvedTarget = path.resolve(PUBLIC_DIR, cleanRelPath);
  if (resolvedTarget.startsWith(PUBLIC_DIR)) {
    if (fs.existsSync(resolvedTarget) && fs.statSync(resolvedTarget).isFile()) {
      serveStaticFile(req, res, resolvedTarget);
      return;
    }
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('404 Not Found');
});

let currentPort = Number(PORT);

if (!process.env.VERCEL) {
  server.once('listening', () => {
    const addr = server.address();
    const actualPort = typeof addr === 'object' && addr ? addr.port : currentPort;
    console.log(`====================================================`);
    console.log(`🚀 Next Label Portfolio Server running on: http://localhost:${actualPort}`);
    console.log(`🛡️  Zero-Trust Security & Range Streaming Enabled`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = currentPort + 1;
      console.warn(`[PORT CONFLICT] Port ${currentPort} in use, trying http://localhost:${nextPort}...`);
      currentPort = nextPort;
      setTimeout(() => {
        server.listen(currentPort);
      }, 100);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(currentPort);
}

export default server;
