# Next Label Portfolio – JUNKBRANDING Reverse Engineering & Asset Archive

[![Integrity Tests](https://img.shields.io/badge/tests-5%20passed-brightgreen.svg)](#verification)
[![Architecture](https://img.shields.io/badge/spec-SDD%20Gherkin-blue.svg)](specs/junkbranding_reverse_engineering.md)
[![Zero-Trust](https://img.shields.io/badge/security-Zero--Trust-gold.svg)](config/policies.yaml)

This repository contains the complete reverse-engineered architecture, assets, GLSL shaders, typography specifications, copywriting data, motion mechanics, and network infrastructure of **[JUNKBRANDING](https://www.junkbranding.com/)** — an award-winning Japanese creative web studio portfolio based on the concept **「深海にも四季がある」** (*"Even the deep sea has four seasons"*).

---

## 📁 Repository Directory Structure

```text
Next_Label_protfolio/
├── .env.example                               # Environment template with [[PLACEHOLDERS]]
├── .env                                       # Local environment variables (gitignored)
├── .gitignore                                 # Git exclusions for secrets and builds
├── README.md                                  # Repository overview and guide
│
├── docs/                                      # Architectural specs & deep analysis
│   ├── ARCHITECTURE.md                        # System architecture, Mermaid diagrams, WebGL pipeline
│   ├── TECH_STACK_BREAKDOWN.md                # Exhaustive technology stack and library list
│   ├── ASSETS_INVENTORY.md                    # Manifest of all 17 preserved media and bundle assets
│   ├── MOTION_AND_INTERACTIONS.md             # GSAP choreography, particle physics & shader math
│   ├── DATA_AND_CONTENT_SPEC.md               # Multilingual copywriting, works data & narrative structure
│   └── NETWORK_AND_SECURITY_ANALYSIS.md       # Edge network, DNS resolution, headers & honeypot logic
│
├── specs/                                     # Spec-Driven Development (SDD) source of truth
│   └── junkbranding_reverse_engineering.md    # Hybrid Markdown + YAML + Gherkin BDD specs
│
├── notes/                                     # Token-saving multi-session tracking
│   ├── PROJECT_STATE.md                       # Real-time completed & pending task tracking
│   └── AGENT_HANDOVER.md                      # 1-paragraph immediate session resume directive
│
├── config/                                    # Zero-Trust policies & security guardrails
│   └── policies.yaml                          # CSP, HSTS, CORS & form rate-limiting policies
│
├── src/                                       # Preserved code, assets, shaders & datasets
│   ├── assets/
│   │   ├── videos/                            # 6 showcased portfolio MP4 videos + 1 poster
│   │   ├── music/                             # Ambient MP3 soundtrack ("Blue Race" - Out of Flux)
│   │   ├── images/                            # Studio portraits & photography (WebP)
│   │   └── branding/                          # Vector SVG favicons & OpenGraph branding
│   ├── shaders/                               # Extracted custom GLSL shaders (warp, clouds, caustics)
│   └── data/                                  # Extracted JSON datasets, raw bundles & markup
│       ├── works.json                         # 7 portfolio works structured dataset
│       ├── site_content.json                  # Complete multilingual site content
│       ├── download_manifest.json             # Cryptographic hash ledger of all assets
│       ├── bundle_index.js                    # Production Vite bundle (773 KB)
│       ├── bundle_SecretEarthPage.js          # Dynamic lazy chunk (9.3 KB)
│       ├── bundle_index.css                   # Compiled LightningCSS bundle (21 KB)
│       └── index.html                         # Semantic pre-rendered markup
│
└── tests/                                     # Automated verification test suites
    └── test_extraction_integrity.py           # Integrity test suite (100% passing)
```

---

## ⚡ Key Highlights of the Architecture

1. **Dual GPGPU Particle System**:
   - Simulates **409,600 particles** simultaneously on high-tier GPUs (512×512 flower points morphing into 384×384 medusa jellyfish points).
   - 5 seasonal particle modes: *Seasons Ring* (Vortex), *Sakura Fall* (Spring), *Hanabi* (Summer fireworks), *Maple Fall* (Autumn foliage), and *Snow Fall* (Winter).
2. **Custom Multi-Pass Post-Processing**:
   - `EffectComposer` pipeline running `AfterimagePass` (motion trails), `UnrealBloomPass` (bioluminescent glow), and custom `ShaderPass` combining radial barrel warp, chromatic aberration, and dynamic film grain.
3. **Web Audio Sound System**:
   - Integrated hardware-accelerated `AudioContext` streaming ambient electronic score (`Out of Flux - Blue Race.mp3`) with interactive sound visualization and smooth volume gain ramps.
4. **Secret Earth Easter Egg**:
   - Form submission at `/api/contact` dynamically loads `SecretEarthPage-DeCha5-M.js` to render a 3D Earth in low orbit featuring triplanar procedural FBM cloud noise without UV seams.
5. **Zero-Trust Hardened Edge**:
   - Global Anycast CDN deployment via Vercel Edge Network, strict W3C CSP Level 3, HSTS 2-year preload, anti-bot honeypot and timing heuristics.

---

## 🧪 Verification & Automated Tests

To run the automated integrity and schema test suite:

```bash
python3 -m unittest discover tests
```
