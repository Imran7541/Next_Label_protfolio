# Comprehensive Technology Stack Breakdown: JUNKBRANDING

This document catalogs every single library, framework, engine, protocol, shader, font, and cloud service identified during reverse-engineering of `https://www.junkbranding.com/`.

---

## 1. Frontend Architecture & Build System

| Component | Technology | Description & Usage |
| :--- | :--- | :--- |
| **Build Bundler** | **Vite (Rollup under the hood)** | Modern ES module bundler producing hash-versioned static chunks (`index-BG4wa0Rg.js`, `SecretEarthPage-DeCha5-M.js`). |
| **CSS Compiler** | **LightningCSS** | High-performance Rust-based CSS transformer with native CSS nesting, CSS variables, and modern color functions. |
| **Script Format** | **Native ES Modules (`type="module"`)** | Code-split modular JavaScript with dynamic `import()` for lazy-loading dialogs. |
| **Rendering Model** | **Hybrid Static MPA / Dynamic SPA** | Semantic HTML5 pre-rendered markup with progressive WebGL / Canvas / Audio hydration. |

---

## 2. 3D Graphics, WebGL & Canvas Engines

| Component | Implementation | Technical Specifics |
| :--- | :--- | :--- |
| **3D Engine** | **Three.js** | Custom tree-shaken build; uses `PerspectiveCamera`, `Scene`, `Points`, `ShaderMaterial`, `Raycaster`. |
| **Post-Processing** | **Three.js EffectComposer** | Multi-pass rendering pipeline: `RenderPass`, `AfterimagePass`, `UnrealBloomPass`, `ShaderPass`, `OutputPass`. |
| **Particle Simulation** | **Custom GPGPU Point System** | 409,600 simultaneous particles across dual systems: Flower (262k) and Medusa (147k) on high-tier GPUs. |
| **Particle Modes** | **Seasonal Presets** | 5 specialized seasonal animation presets: `seasonsRing` (Vortex), `sakuraFall` (Spring petals), `hanabi` (Summer fireworks), `mapleFall` (Autumn leaves), `snowFall` (Winter snow), and `medusa` (Jellyfish swimming). |
| **Canvas Layers** | **3 Distinct Canvases** | 1. `[data-stage]` (Primary 3D WebGL stage)<br/>2. `[data-loader-motif]` (Procedural loading motif)<br/>3. `[data-secret-earth-canvas]` (Low-orbit Earth globe dialog) |
| **GLSL Shaders** | **39 Shaders Compiled** | Custom shaders for chromatic aberration, screen warp, film grain, dunes, caustics, sun rays, glass bubbles, triplanar clouds, and fresnel atmospheric glow. |

---

## 3. Animation, Motion & Interactions

| Component | Library / Technique | Details |
| :--- | :--- | :--- |
| **Choreography Engine** | **GSAP (GreenSock)** | Timeline sequencing, character splitting (`data-reveal="chars"`), sweep line reveals (`data-reveal="sweep"`), and rise effects (`data-reveal="rise"`). |
| **Parallax Engine** | **CSS Transform + Data Depth** | Multi-plane depth parallax controlled via custom attributes (`data-depth="0.6"`, `0.8`, `1.0`, `1.2`, `1.5`). |
| **SVG Filters** | **SVG Defs & Filter Matrix** | `#water-warp` (feTurbulence + feDisplacementMap), `#works-warp`, and `#duotone` color matrix filter. |
| **Sensor Controls** | **DeviceOrientation API** | Accelerometer and gyroscope tracking (`gamma`, `beta`) for real-time mobile tilt effect. |
| **Inertia & Magnetic Cursor** | **Pointer Velocity Tracking** | Normalized Device Coordinates (NDC) raycasting with inertia and velocity decay. |

---

## 4. Audio Engine & Sound Synthesis

| Component | Technology | Implementation |
| :--- | :--- | :--- |
| **Audio Pipeline** | **Web Audio API (`AudioContext`)** | Hardware-accelerated browser audio context with fallback to `webkitAudioContext`. |
| **Soundtrack** | **"Blue Race" by Out of Flux** | Ambient electronic musical score (`/music/Out of Flux - Blue Race.mp3`, 6.36 MB, 320kbps MP3). |
| **Volume & Fading** | **GainNode Linear Ramp** | Smooth volume ramp-up on initiation and ramp-down on pause or tab deactivation. |
| **UI Toggle** | **Interactive Sound Pill** | Masthead toggle with animated wave visualizer state and session state persistence. |

---

## 5. Typography & Font System

| Font Family | Style / Category | Usage in Project |
| :--- | :--- | :--- |
| **Shippori Mincho (しっぽり明朝)** | Elegant Japanese Serif | Headings, hero statement, seasonal titles, poetic storytelling. |
| **Zen Kaku Gothic New (Zen角ゴシック)** | Clean Modern Sans-Serif | Body text, UI labels, form fields, descriptions, metadata. |
| **Instrument Serif** | High-contrast English Editorial Serif | Numerical indices, English subtitles, dates, accents. |
| **Hiragino Mincho ProN / Yu Mincho** | System Serif Fallbacks | Native OS rendering fallback for Apple and Windows devices. |
| **Hiragino Sans / Yu Gothic** | System Sans Fallbacks | Native OS sans-serif rendering fallback. |

---

## 6. Cloud Infrastructure, Hosting & Backend

| Infrastructure Layer | Provider | Technical Configuration |
| :--- | :--- | :--- |
| **Edge CDN & Hosting** | **Vercel Anycast Edge Network** | IP: `216.150.1.1`, `216.150.16.1` (AS16509 Amazon Web Services backbone). |
| **Point of Presence (POP)** | **BOM1 (Vercel Edge Node)** | Multi-region global caching with `X-Vercel-Cache: HIT`. |
| **Serverless Compute** | **Vercel Serverless Functions** | Endpoint: `POST /api/contact` (Node.js runtime). |
| **Media Distribution CDN** | **AWS CloudFront** | Distribution domain: `d2crmzpw5das9r.cloudfront.net` for video previews and client assets. |
| **Security & Privacy** | **Zero-Trust Hardened** | W3C CSP Level 3, HSTS 2-year preload, COOP same-origin, CORP same-origin, no third-party cookies. |

---

## 7. Portfolio Works Showcase Technology Matrix

| Project | Client / Domain | Year | Live URL | Technologies Used |
| :--- | :--- | :--- | :--- | :--- |
| **TO PLACE** | Housing & Real Estate | 2025 | `https://to-place.co.jp/` | HTML/CSS, JavaScript, GSAP |
| **IWAKIKI** | Real Estate (Fukushima) | 2025 | `https://d2crmzpw5das9r.cloudfront.net/` | HTML/CSS, JavaScript, AWS CloudFront |
| **NEXT** | Corporate Portfolio | 2024 | `https://next-inc.group/` | HTML/CSS, JavaScript, Canvas |
| **TRANS B** | Logistics & Transport | 2025 | `https://trans-b.vercel.app/` | Three.js, WebGL, GSAP, Vercel |
| **LUZ REAL** | Real Estate (Tokyo Central 4 Wards) | 2024 | `https://luz-real.com/` | HTML/CSS, JavaScript, Web Audio API |
| **HAND** | JUNKBRANDING Experimental | 2026 | `https://hand.junkbranding.com/` | Hand Tracking, Camera API, Web Audio |
| **FUNKY** | JUNKBRANDING Brand Edition | 2025 | `https://funky.junkbranding.com/` | Next.js, React, WebGL |
