# Next Label Portfolio — Imran Hossain | Software & Product Developer

[![Tests](https://img.shields.io/badge/tests-18%20passed-brightgreen.svg)](#-verification--automated-tests)
[![Architecture](https://img.shields.io/badge/architecture-3D%20WebGL%20Three.js-blue.svg)](docs/ARCHITECTURE.md)
[![Zero-Trust](https://img.shields.io/badge/security-Zero--Trust%20Hardened-gold.svg)](config/policies.yaml)
[![Bilingual](https://img.shields.io/badge/localization-English%20%7C%20Bengali-cyan.svg)](public/assets/i18n.js)

An immersive, high-performance 3D WebGL interactive portfolio developed by **Imran Hossain**, Software & Product Developer. Combining thoughtful aesthetics, GPU-accelerated particle physics, kinetic GSAP choreography, and real-time AI automation solutions.

---

## 🌟 Overview & Core Focus

I build websites, mobile apps, and SaaS products that solve real-world business problems through thoughtful design, modern development, and AI automation.

- **Full-Stack Web Development**: Modern web applications built with React, Next.js, TypeScript, and Tailwind CSS focused on high performance and exceptional usability.
- **AI Automation & Integration**: End-to-end intelligent agent workflows, business process automation, and CRM integrations.
- **SaaS & Mobile Product Engineering**: Scalable cloud platforms, interactive Flutter cross-platform apps, and real-time dashboard systems.

---

## ⚡ Technical Highlights

1. **Dual GPGPU Particle System (409,600 Particles)**:
   - GPU-accelerated WebGL particle engine simulating up to 409,600 points concurrently on high-tier GPUs (scaling gracefully to 102,400 on low-tier and mobile devices).
   - 4 seasonal transitions: Spring (*Sakura Drift*), Summer (*Hanabi Fireworks*), Autumn (*Maple Flow*), and Winter (*Deep Sea Snow*).

2. **Custom Multi-Pass Post-Processing Pipeline**:
   - `EffectComposer` pipeline running `AfterimagePass` (motion persistence trails), `UnrealBloomPass` (bioluminescent illumination), and a custom `ShaderPass` combining chromatic aberration, radial barrel distortion, and dynamic film grain.

3. **Two-Step Interactive Intro Sequence**:
   - Clean, uncluttered layout with an introductory sequence:
     1. **Step 1**: Audio preference selection (`Enter with sound` / `Without sound`).
     2. **Step 2**: Language selection (`English (EN)` / `বাংলা (BN)`).
     3. **Step 3**: Smooth dissolve transition directly into the 3D world.

4. **Reactive Bilingual Engine (`i18n.js`)**:
   - Complete instant client-side translation across all views (Hero, About, Services 01–08, Works 01–08, Contact, Footer, Secret Earth).
   - Zero-layout-shift font rendering with dedicated Bengali typography stack (`Hind Siliguri`, `Kalpurush`, `Noto Sans Bengali`).

5. **Production Node.js Streaming Server (`server.js`)**:
   - HTTP 206 Partial Content Range streaming for video case studies and high-bitrate ambient audio.
   - W3C CSP Level 3, HSTS 2-Year Preload, COOP, CORP, and rate-limited bot-protected contact inquiry endpoint.

---

## 📁 Repository Directory Structure

```text
Next_Label_protfolio/
├── .env.example                               # Environment template with [[PLACEHOLDERS]]
├── .env                                       # Local environment variables (gitignored)
├── .gitignore                                 # Git exclusions for secrets, caches, and builds
├── README.md                                  # Repository overview and technical guide
├── server.js                                  # Production HTTP/206 Range streaming server
├── index.html                                 # Semantic pre-rendered HTML5 markup
│
├── docs/                                      # Architectural specs & technical blueprints
│   ├── ARCHITECTURE.md                        # WebGL rendering pipeline, Three.js scene graphs
│   ├── TECH_STACK_BREAKDOWN.md                # Full technology stack, versions & engines
│   ├── ASSETS_INVENTORY.md                    # Manifest of media assets, videos, and posters
│   ├── MOTION_AND_INTERACTIONS.md             # GSAP choreography, particle physics & shader math
│   ├── DATA_AND_CONTENT_SPEC.md               # Copywriting, services & project catalogue data
│   ├── SECURITY_AUDIT_AND_SOLVING_BLUEPRINT.md # Zero-Trust hardening & vulnerability resolutions
│   └── 01_PRD.md - 06_Plan.md                 # Product specifications, schemas, and plans
│
├── specs/                                     # Spec-Driven Development (SDD) source of truth
│   ├── next_label_portfolio_architecture.md   # Gherkin BDD scenarios & behavioral contracts
│   ├── bilingual_localization_and_language_toggle.md # i18n specifications
│   └── tasks_intro_language_step.md           # Two-step intro loader task specification
│
├── notes/                                     # Live state & handover directives
│   ├── PROJECT_STATE.md                       # Real-time completed & pending task tracking
│   └── AGENT_HANDOVER.md                      # Rapid session resume directive
│
├── config/                                    # Zero-Trust security policies
│   └── policies.yaml                          # Strict CSP, HSTS & inquiry rate-limiting rules
│
├── public/                                    # Static assets served by production server
│   ├── assets/                                # Bundled JavaScript, CSS & i18n engine
│   ├── images/                                # High-resolution WebP portraits & visuals
│   ├── music/                                 # Ambient electronic score (Out of Flux)
│   ├── videos/                                # 8 showcased portfolio MP4 videos (960x424)
│   ├── favicon.svg, apple-touch-icon.png      # Brand icons & OpenGraph media
│   └── robots.txt, sitemap.xml                # SEO & crawler indexing files
│
├── src/                                       # Structured data, shaders & server services
│   ├── data/inquiries.json                    # File-backed contact form storage
│   ├── data/works.json                        # 8 showcased project specifications
│   ├── data/site_content.json                 # Structured site copywriting
│   └── shaders/                               # GLSL custom fragment shaders
│
└── tests/                                     # Automated test suites (18 tests)
    ├── test_portfolio_integrity.py            # File integrity & asset manifest verification
    └── test_server_live.py                    # Live server HTTP, streaming & security tests
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 20.0.0`
- Python `3.x` (for automated test suite)

### Installation
```bash
# Clone the repository
git clone https://github.com/Imran7541/Next_Label_protfolio.git
cd Next_Label_protfolio

# Install dependencies
npm install
```

### Running the Server
```bash
# Start the production server
npm start

# Or run with custom port
PORT=3002 node server.js
```
Visit `http://localhost:3002` in your browser.

---

## 🧪 Verification & Automated Tests

Run the complete 18-point automated test suite:
```bash
npm test
```
All 18 tests execute across HTTP response validation, Range streaming, security headers, XSS prevention, Honeypot traps, and bilingual DOM verification.

---

## 📬 Contact & Inquiries

- **Developer**: Imran Hossain
- **Email**: `imrandt2001@gmail.com`
- **Location**: Bangladesh (Available for remote collaboration worldwide)
- **GitHub**: [https://github.com/Imran7541](https://github.com/Imran7541)

---
© 2026 Imran Hossain. All rights reserved.
