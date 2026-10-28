# Next Label Portfolio: Security Audit & Bug Solving Blueprint
**Standard:** Spec-Driven Development (SDD) & Zero-Trust Agentic Engineering Standard  
**Project:** Next Label Portfolio (Inspired by JUNKBRANDING - 「深海にも四季がある」)  
**Date:** October 27, 2026  
**Auditor / Architect:** Antigravity AI Engineering Harness  

---

## 1. Executive Summary & Audit Scope

A comprehensive security vulnerability audit, penetration testing scan, and code logic review were conducted on the Next Label portfolio web platform. The inspection evaluated both client-side static assets and server-side runtime behavior against the **OWASP Top 10 (2021/2026)** and **Zero-Trust Defense-in-Depth** principles.

All identified vulnerabilities and bugs were systematically resolved, verified with automated end-to-end regression tests, and certified merge-ready.

```text
Audit Status: 100% Remediation Verified
Total Tests: 17/17 Passed (0 Failures, 0 Regressions)
Vulnerabilities Remediated: 6 (1 Critical, 2 Medium, 2 Low, 1 Functional Bug)
```

---

## 2. Vulnerability & Bug Matrix

| ID | Title / Vulnerability | CWE | Severity | Status | Affected Component |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **VULN-01** | Arbitrary File Disclosure / Path Traversal | CWE-22, CWE-200 | **CRITICAL** | **RESOLVED** | `server.js` (Lines 308–313) |
| **VULN-02** | Stored XSS / Unsanitized Input Ingestion | CWE-79 | **MEDIUM** | **RESOLVED** | `POST /api/contact` |
| **VULN-03** | Rate Limiting DoS via Unbounded Memory | CWE-400 | **MEDIUM** | **RESOLVED** | `isRateLimited()` in `server.js` |
| **VULN-04** | Header Injection / Spoofed IP Attribution | CWE-290 | **LOW** | **RESOLVED** | `getClientIP()` in `server.js` |
| **VULN-05** | Missing HSTS & Modern Protection Headers | CWE-693 | **LOW** | **RESOLVED** | `setSecurityHeaders()` in `server.js` |
| **VULN-06** | Inquiry State Corruption on Concurrent I/O | CWE-362 | **LOW** | **RESOLVED** | `saveInquiry()` in `server.js` |
| **BUG-01** | Missing Favicon & Apple Touch Icons (404) | Functional | **LOW** | **RESOLVED** | `public/favicon-32.png`, `apple-touch-icon.png` |

---

## 3. Forensic Analysis & Root Cause Breakdown

### 3.1. VULN-01 (Critical): Arbitrary File Disclosure via Root Directory Fallback
- **Root Cause:**
  In the native HTTP router, `server.js` had a fallback to serve root-level files:
  ```javascript
  // VULNERABLE CODE:
  let rootTarget = path.join(ROOT_DIR, pathname);
  if (fs.existsSync(rootTarget) && fs.statSync(rootTarget).isFile()) {
    serveStaticFile(req, res, rootTarget);
    return;
  }
  ```
- **Exploitation Impact:**
  Any external unauthenticated HTTP client requesting `http://localhost:3002/.env` would receive the raw `.env` file containing internal API keys, database configs, and server secrets. Furthermore, `/package.json`, `/server.js`, and customer contact inquiries in `/src/data/inquiries.json` were fully accessible.
- **Architectural Fix:**
  1. Enforce a strict **Root Whitelist Set** allowing only explicitly safe root assets (`robots.txt`, `sitemap.xml`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`).
  2. Reject all paths containing null bytes (`\0`, `%00`).
  3. Enforce **Path Confinement** using `path.resolve(PUBLIC_DIR, cleanRelPath).startsWith(PUBLIC_DIR)`. Any request resolving outside `PUBLIC_DIR` is unconditionally rejected with HTTP 404.

---

### 3.2. VULN-02 (Medium): Stored XSS via `POST /api/contact`
- **Root Cause:**
  The contact endpoint parsed `name`, `email`, and `message` from client JSON without sanitizing control characters or checking for HTML/script tags before writing to `inquiries.json`.
- **Exploitation Impact:**
  If an administrator or client viewed inquiries in a dashboard, injected `<script>` or `<img onerror=...>` payloads could execute in their session.
- **Architectural Fix:**
  1. Added `sanitizeInput()` utility stripping ASCII control characters (`\x00-\x1F\x7F`).
  2. Enforced strict regex tag rejection: `/<[^>]*>/.test(input)` -> returns `400 Bad Request` with message `"HTML tags and scripts cannot be sent."`.
  3. Added strict length and email format constraints.

---

### 3.3. VULN-03 & VULN-04: Memory Exhaustion DoS & IP Spoofing
- **Root Cause:**
  `rateLimits` Map accumulated IP keys indefinitely without sweeping old entries. Furthermore, `req.headers['x-forwarded-for']` was trusted blindly without format validation.
- **Exploitation Impact:**
  An attacker generating randomized IP headers could exhaust Node.js heap memory, resulting in process crash (DoS).
- **Architectural Fix:**
  1. Implemented bounded sweeping: when `rateLimits.size > 2000`, expired records (>1 hour) are automatically evicted.
  2. Added strict regex validation for client IP (`/^[a-fA-F0-9:.]+$/`, length <= 45). Non-conforming headers fallback to socket remote address.

---

### 3.4. VULN-05: Missing HSTS & Security Headers
- **Root Cause:**
  `Strict-Transport-Security` was omitted, and legacy `X-XSS-Protection: 1; mode=block` was present instead of modern standard `0` (which prevents side-channel XS-leaks in Chromium).
- **Architectural Fix:**
  Updated `setSecurityHeaders()`:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-XSS-Protection: 0`
  - Strict Content-Security-Policy with `default-src 'self'` and bounded script/media domains.

---

### 3.5. VULN-06 & BUG-01: Concurrency Race Condition & Missing Icons
- **Root Cause:**
  `fs.writeFileSync(INQUIRIES_FILE, ...)` could truncate the file if two requests arrived simultaneously. Also, `index.html` declared `<link rel="icon" href="/favicon-32.png">` and `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` which returned 404.
- **Architectural Fix:**
  1. Implemented atomic write protocol: writes to `inquiries.json.<timestamp>.<rand>.tmp` first, then atomically invokes `fs.renameSync()`.
  2. Generated high-resolution, pixel-crisp `favicon-32.png` and `apple-touch-icon.png` (180x180) from `public/og.jpg` using `ffmpeg`.

---

## 4. Remediation Blueprint & Code Architecture

### 4.1. Hardened Static File Router (`server.js`)
```javascript
// Main HTTP request router with Zero-Trust Confinement
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
```

---

## 5. Verification & Regression Test Suite

All 17 automated tests pass with 100% compliance:

```bash
$ npm test

> next-label-portfolio@1.0.0 test
> python3 -m unittest discover tests

----------------------------------------------------------------------
Ran 17 tests in 1.545s

OK
```

### Verified Test Assertions:
1. `test_01_homepage_served`: Returns 200 OK with CSP, HSTS, X-Frame-Options: DENY.
2. `test_02_video_range_streaming`: Range `bytes=0-1023` returns 206 Partial Content.
3. `test_03_music_range_streaming`: Range `bytes=0-2047` returns 206 Partial Content.
4. `test_04_js_bundles_served`: JS bundles served with correct MIME and integrity.
5. `test_05_contact_api_bot_honeypot_rejection`: Traps automated bots in 400.
6. `test_06_contact_api_bot_timing_rejection`: Form submissions < 3000ms rejected.
7. `test_07_contact_api_valid_submission`: Legitimate inquiries succeed with 200.
8. `test_08_path_traversal_dot_env_blocked`: Requesting `/.env` unconditionally returns 404.
9. `test_09_path_traversal_package_json_blocked`: Traversal to `/package.json`, `/server.js`, `/src/data/inquiries.json`, `/../server.js` blocked with 404.
10. `test_10_stored_xss_payload_rejected`: Script and HTML injection payloads rejected with 400.
11. `test_11_hsts_and_security_headers_present`: Strict HSTS and nosniff headers verified.
12. `test_12_favicon_32_and_apple_touch_icon_exist`: `favicon-32.png` and `apple-touch-icon.png` verified 200 OK.
13. `test_manifest_assets_exist_and_match_hash`: Asset integrity matches SHA-256.
14. `test_works_catalog_schema`: Catalog conforms to strict schema.
15. `test_site_content_structure`: All 8 content panels present.
16. `test_shaders_exist`: Custom WebGL GLSL shaders verified.
17. `test_documentation_and_spec_files_exist`: All 17 architectural specs verified.

---

## 6. Zero-Trust Security Checklist for Ongoing Development

1. **Static Assets**:
   - Always place publicly servable assets in `public/`.
   - Never place secret config files or database JSON files inside `public/`.
2. **Contact & Input Endpoints**:
   - Always sanitize and validate field length and types server-side.
   - Reject HTML/script tags before storing in JSON or database.
   - Maintain bot traps (honeypot + timing heuristics).
3. **HTTP Transport & Headers**:
   - Always ensure HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff are present on all responses.
4. **File Operations**:
   - Always use atomic write (`.tmp` + `renameSync`) when persisting user data to file.
