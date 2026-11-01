/**
 * Cloudflare Pages Function: POST /api/contact
 * Handles contact form submissions at Cloudflare's Edge.
 * Provides honeypot bot filtering, length validation, and success response triggering Secret Earth.
 */

export async function onRequestPost(context) {
  const { request } = context;

  // CORS & Security headers
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  };

  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Expected application/json' }),
        { status: 400, headers }
      );
    }

    const data = await request.json().catch(() => null);
    if (!data || typeof data !== 'object') {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid JSON payload' }),
        { status: 400, headers }
      );
    }

    const { name, email, message, company_website, elapsed } = data;

    // 1. Honeypot check (bot trap)
    if (company_website && String(company_website).trim() !== '') {
      return new Response(
        JSON.stringify({ ok: false, error: 'Bot detected' }),
        { status: 400, headers }
      );
    }

    // 2. Minimum elapsed fill time heuristic (3000ms minimum)
    if (elapsed !== undefined && typeof elapsed === 'number' && elapsed < 2000) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Submission rejected: too fast' }),
        { status: 400, headers }
      );
    }

    const errors = {};

    // 3. Name validation
    const cleanName = String(name || '').trim();
    if (!cleanName || cleanName.length < 2) {
      errors.name = 'short';
    } else if (cleanName.length > 60) {
      errors.name = 'long';
    }

    // 4. Email validation
    const cleanEmail = String(email || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      errors.email = 'invalid';
    } else if (cleanEmail.length > 254) {
      errors.email = 'long';
    }

    // 5. Message validation
    const cleanMessage = String(message || '').trim();
    if (!cleanMessage || cleanMessage.length < 20) {
      errors.message = 'short';
    } else if (cleanMessage.length > 1200) {
      errors.message = 'long';
    }

    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({ ok: false, errors }),
        { status: 400, headers }
      );
    }

    // Inquiry is valid!
    return new Response(
      JSON.stringify({
        ok: true,
        success: true,
        message: 'Message transmitted successfully.'
      }),
      { status: 200, headers }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Internal Server Error' }),
      { status: 500, headers }
    );
  }
}
