# Network, Security & Infrastructure Analysis: Next Label

This document presents forensic evidence, network capture analysis, security posture evaluations, and backend endpoint behavior for `https://imranhossain.dev/`.

---

## 1. Network Topology & DNS Dissection

### 1.1 DNS Resolution & Anycast Routing
Network probes conducted against `imranhossain.dev` and all known studio subdomains revealed the following topology:

| Hostname | Resolved IP Addresses | ASN & Routing Entity | Service Type |
| :--- | :--- | :--- | :--- |
| `imranhossain.dev` | `216.150.1.1`, `216.150.16.1` | AS16509 (Amazon.com / Vercel Edge) | Main Production Studio Site |
| `hand.imranhossain.dev` | `216.150.1.1`, `216.150.16.1` | AS16509 (Amazon.com / Vercel Edge) | Hand-Tracking Studio Version |
| `funky.imranhossain.dev` | `216.150.1.1`, `216.150.16.1` | AS16509 (Amazon.com / Vercel Edge) | Funky WebGL Next.js Studio Version |
| `fukushi.imranhossain.dev` | `216.150.1.193`, `216.150.16.193`| AS16509 (Amazon.com / Vercel Edge) | Kurashi Shien Navi (Public Welfare Nav) |
| `lab.imranhossain.dev` | `216.150.1.193`, `216.150.16.193`| AS16509 (Amazon.com / Vercel Edge) | Creative Dev Engineering Blog |
| `school.imranhossain.dev` | `216.150.1.1`, `216.150.16.1` | AS16509 (Amazon.com / Vercel Edge) | "0→1" Website Production Academy |

- **Apex Domain (`imranhossain.dev`)**: Does not resolve an A record directly; canonical resolution enforces traffic through `imranhossain.dev`.
- **Anycast Edge Network**: Traffic terminates at Vercel's global edge network nodes (e.g., node identifier `bom1::prkd5-1792916612807-7aecc9c38a0d`), ensuring under 50ms latency globally.

---

## 2. HTTP/2 Security Headers & Policy Audit

Live forensic inspection of HTTP response headers yielded the following enterprise security profile:

```http
HTTP/2 200 OK
Server: Vercel
X-Vercel-Cache: HIT
Content-Type: text/html; charset=utf-8
Cache-Control: public, max-age=0, must-revalidate
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Permissions-Policy: accelerometer=(self), gyroscope=(self), magnetometer=(), camera=(), microphone=(), geolocation=(), payment=(), usb=()
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

### 2.1 Security Posture Evaluation
1. **W3C Content Security Policy (Level 3)**:
   - `default-src 'self'`: Complete elimination of cross-site script inclusion (XSSI).
   - No external CDNs permitted in main index: All scripts and styles must originate from `self`.
   - `frame-ancestors 'none'`: Fully immune to clickjacking attacks.
2. **Permissions Policy**:
   - `accelerometer=(self)` and `gyroscope=(self)` explicitly granted to enable mobile tilt interaction.
   - `camera=()`, `microphone=()`, `geolocation=()`, and `payment=()` explicitly disabled to ensure user privacy.
3. **Cross-Origin Isolation**:
   - `COOP: same-origin` and `CORP: same-origin` prevent cross-origin leaks and spectre-type cache attacks.
4. **HSTS Preload**:
   - 2-year (`63,072,000` seconds) strict transport security with `includeSubDomains; preload`.

---

## 3. Backend Contact Form API Forensics

### 3.1 Endpoint Contract
- **Route**: `POST /api/contact`
- **Headers**: `Content-Type: application/json`
- **Credentials**: `same-origin`
- **Client Timeout**: 15,000ms (`AbortController`)

### 3.2 Anti-Bot & Threat Mitigation Heuristics
1. **Honeypot Trap (`company_website`)**:
   - An off-screen input tagged `tabindex="-1"` and `aria-hidden="true"`.
   - If populated, the request is immediately dropped or rejected without executing business logic.
2. **Timing Threshold (`minFillMs`)**:
   - Measures elapsed time from page load / form focus to submit button click (`Date.now() - this.startedAt`).
   - If `elapsed < 3000ms`, the submission is blocked with prompt:  
     *"少し時間をおいてから、もう一度お試しください。"* (Please wait a moment before trying again.)
3. **Client-Side Throttling (`sentRecently()`)**:
   - Prevents rapid duplicate form submissions in the local browser session.
4. **Sanitization**:
   - Cleans leading/trailing whitespace and escapes control characters before transmission.
