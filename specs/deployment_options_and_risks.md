# Architectural Spec: Multi-Platform Deployment & Platform Constraints

## 1. Overview & Context
- **Target Platforms**: GitHub Pages, GitLab / Cloudflare / Cloud Platform ("Cloud Lab"), and Vercel Production.
- **Current Live Production**: [https://next-label-portfolio.vercel.app](https://next-label-portfolio.vercel.app)
- **GitHub Repository**: [https://github.com/Imran7541/Next_Label_protfolio](https://github.com/Imran7541/Next_Label_protfolio)
- **Goal**: Evaluate risks, architectural barriers, and actionable deployment procedures for deploying Next Label Portfolio across GitHub Pages and alternative cloud platforms without degrading visual quality or functionality.

---

## 2. Risk & Impact Analysis Matrix

| Concern | GitHub Pages | Vercel (Current Live) | Cloudflare Pages / GitLab |
| :--- | :--- | :--- | :--- |
| **Domain Base Path** | Subpath `/Next_Label_protfolio/` breaks absolute asset URLs (`/assets/*`, `/videos/*`) unless repo is renamed to `username.github.io` or custom domain is bound | Root domain `/` works out of the box with zero asset path rewriting | Root domain works on custom subdomain (`*.pages.dev`); GitLab has subpath issue similar to GitHub Pages |
| **Backend Contact API (`POST /api/contact`)** | **Unsupported** (Static only, returns HTTP 405 Method Not Allowed) | **Supported** via Serverless / Edge Function or external API relay | Supported on Cloudflare Pages via Cloudflare Workers (`functions/api/contact.js`) |
| **Range Requests (HTTP 206 for Videos/Audio)** | Basic static file streaming; prone to monthly 100GB soft cap | Optimized with `Accept-Ranges: bytes` and global Edge CDN caching | Full global Edge CDN caching and byte-range support |
| **Security Headers (CSP, HSTS, COOP, CORP)** | Cannot configure custom HTTP headers on standard GitHub Pages | Hardened via `vercel.json` and `server.js` | Configurable via `_headers` file |

---

## 3. Recommended Implementation Strategy
1. **GitHub Pages Option A (Recommended for GitHub)**:
   - Create a repository named `Imran7541.github.io` (GitHub User Page).
   - Serves directly from root: `https://imran7541.github.io/`.
   - All assets, 3D WebGL particle bundles, and videos load with zero 404 path breaks.
2. **GitHub Pages Option B (Subpath on current repo)**:
   - Configure a GitHub Actions workflow that replaces root-relative paths (`/assets/` -> `./assets/` or `<base href="/Next_Label_protfolio/">`).
   - Note: In dynamic JS bundles (`bundle_index.js`), dynamic imports still reference root unless dynamically adjusted.
3. **Backend Form Relay**:
   - For static hosting (GitHub Pages), route form submissions to the active Vercel endpoint (`https://next-label-portfolio.vercel.app/api/contact`) or fallback directly to `mailto:imrandt2001@gmail.com`.
4. **Cloud Lab Clarification**:
   - Clarify whether user intends GitLab, Cloudflare Pages, or Google Cloud Run / Container.
