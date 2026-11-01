# Technical Plan: Cloudflare Pages Deployment & Edge Optimization

## 1. Technical Context & Strategy
- **Platform**: Cloudflare Pages
- **Target Repository**: `Imran7541/Next_Label_protfolio`
- **Output Directory**: `public`
- **Root Directory**: `/`
- **Why Cloudflare Pages is the Ideal Choice**:
  1. **Zero Bandwidth Limits**: Unlike Vercel (100GB/mo free tier limit) or GitHub Pages (100GB/mo soft limit), Cloudflare Pages provides **unlimited bandwidth** on the free tier. This is critical because our 8 high-definition 3D portfolio showcase videos and background music total ~52MB per full visit.
  2. **Global Anycast Edge Network**: 300+ global edge data centers with sub-10ms response times worldwide.
  3. **Cloudflare Pages Functions**: Serverless edge execution under `/functions/api/contact.js` natively handling `POST /api/contact` with zero external backend requirement.
  4. **Native Byte-Range Streaming**: Full HTTP 206 Partial Content support for smooth MP4 video seeking and MP3 audio buffering.
  5. **Continuous Deployment (CI/CD)**: Cloudflare connects directly to the GitHub repository. Every `git push` to `main` instantly triggers an edge deploy in seconds.

---

## 2. Architecture & File Contracts

### 2.1 Edge Functions: `functions/api/contact.js`
- **Path**: `functions/api/contact.js`
- **Method**: `POST`
- **Capabilities**:
  - Handles inquiry submissions from the contact form.
  - Enforces Honeypot bot protection (`company_website` must be empty).
  - Validates minimum and maximum field lengths (Name 2-60, Email valid RFC 5322, Message 20-1200).
  - Returns structured JSON `{ ok: true, message: "Thank you..." }`.
  - CORS and security headers enforced on edge.

### 2.2 Security & Cache Headers: `public/_headers`
- Sets W3C Content Security Policy, HSTS, X-Content-Type-Options, X-Frame-Options, and Permissions-Policy.
- Sets immutable 1-year cache headers and `Accept-Ranges: bytes` for `/videos/*`, `/music/*`, and `/assets/*`.

### 2.3 Edge Routing Rules: `public/_redirects`
- Handles clean URLs and client-side routing fallbacks.

---

## 3. Step-by-Step Deployment Guide for Cloudflare Dashboard

1. **Sign in to Cloudflare**:
   - Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/).
2. **Create Pages Application**:
   - Navigate to **Workers & Pages** > **Create application** > **Pages** tab.
   - Click **Connect to Git**.
   - Authenticate with your GitHub account (`Imran7541`).
   - Select the repository: `Imran7541/Next_Label_protfolio`.
3. **Configure Build Settings**:
   - **Project name**: `next-label-portfolio` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(Leave empty)*
   - **Build output directory**: `public`
4. **Deploy**:
   - Click **Save and Deploy**.
   - Cloudflare will deploy the site in ~15-30 seconds and provide a live URL like `https://next-label-portfolio.pages.dev`.
5. **(Optional) Custom Domain**:
   - In Cloudflare Pages project settings, go to **Custom domains** > **Set up a custom domain** to attach your own domain with 1-click free SSL.
