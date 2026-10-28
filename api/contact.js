export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, message, company_website, fill_start_ms } = body;

    // 1. Anti-bot Honeypot Trap
    if (company_website) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // 2. Anti-bot Timing Heuristic (minimum 3,000ms threshold)
    const elapsed = fill_start_ms ? Date.now() - Number(fill_start_ms) : 99999;
    if (elapsed < 3000) {
      return res.status(429).json({ errors: { general: 'Please wait a moment before trying again.' } });
    }

    // 3. Sanitization & Validation
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanMessage = (message || '').trim();

    const htmlTagPattern = /<[^>]*>/;
    if (htmlTagPattern.test(cleanName) || htmlTagPattern.test(cleanEmail) || htmlTagPattern.test(cleanMessage)) {
      return res.status(400).json({ errors: { general: 'HTML tags and scripts cannot be sent.' } });
    }

    const errors = {};
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
      return res.status(400).json({ errors });
    }

    console.log(`[VERCEL INQUIRY] Received from: ${cleanName} <${cleanEmail}>`);
    return res.status(200).json({ success: true, message: 'Message sent successfully. Thank you for reaching out!' });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
}
