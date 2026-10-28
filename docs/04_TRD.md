# 04_TRD.md – Technical Requirements Document
## Project: Next Label Portfolio
**Version:** 1.0.0  
**Status:** Approved / Architecture-Locked  

---

## 1. Locked Technology Stack & Pinned Versions

To guarantee deterministic, production-grade builds without training-cutoff downgrade, all dependencies are strictly locked to exact versions:

```yaml
core_runtime:
  node: ">=20.18.0"
  package_manager: "pnpm@9.15.0"
  framework: "next@15.2.0"
  react: "19.0.0"
  react_dom: "19.0.0"
  typescript: "5.7.3"

graphics_and_animation:
  three: "0.174.0"
  types_three: "^0.174.0"
  gsap: "3.12.7"
  glslify: "7.1.1"

styling_and_design:
  tailwindcss: "4.0.9"
  lightningcss: "1.29.1"
  clsx: "2.1.1"
  tailwind_merge: "3.0.2"

backend_and_database:
  supabase_js: "2.49.1"
  drizzle_orm: "0.39.3"
  drizzle_kit: "0.30.4"
  postgres: "3.4.5"
  zod: "3.24.2"
  resend: "4.1.2"

testing_and_quality:
  vitest: "3.0.7"
  playwright: "1.50.1"
  eslint: "9.21.0"
```

---

## 2. Mandatory Repository & Folder Architecture

```text
Next_Label_protfolio/
├── .env.example                               # Environment template with [[PLACEHOLDERS]]
├── .env                                       # Local secrets (gitignored)
├── CLAUDE.md                                  # Instructions for Claude Code agent
├── .cursorrules                               # Instructions for Cursor IDE agent
│
├── docs/                                      # 6-Document Context Architecture
│   ├── 01_PRD.md
│   ├── 02_AppFlow.md
│   ├── 03_UI_Spec.md
│   ├── 04_TRD.md
│   ├── 05_Schema.md
│   └── 06_Plan.md
│
├── specs/                                     # Spec-Driven Development (SDD) source
│   └── junkbranding_reverse_engineering.md
│
├── notes/                                     # Token-saving live state tracking
│   ├── PROJECT_STATE.md
│   └── AGENT_HANDOVER.md
│
├── config/                                    # Zero-Trust security & gating policies
│   └── policies.yaml
│
├── src/                                       # Core application source code
│   ├── app/                                   # Next.js 15 App Router
│   │   ├── layout.tsx                         # Root layout with fonts & metadata
│   │   ├── page.tsx                           # Single-page interactive canvas & panels
│   │   ├── sitemap.ts                         # Dynamic XML sitemap generator
│   │   ├── robots.ts                          # Robots.txt route handler
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts                   # Edge API endpoint with honeypot & timing
│   │
│   ├── components/                            # Modular React 19 UI components
│   │   ├── canvas/                            # WebGL Three.js renderers & controllers
│   │   │   ├── StageCanvas.tsx                # Main 3D stage component
│   │   │   ├── ParticleSystem.ts              # GPGPU dual particle engine (409k points)
│   │   │   ├── OceanEnvironment.ts            # Seabed dunes, caustics, and god rays
│   │   │   ├── PostProcessingPipeline.ts      # Afterimage, bloom, and finish pass
│   │   │   └── SecretEarthModal.tsx           # Lazy-loaded low-orbit Earth 3D dialog
│   │   ├── dom/                               # Semantic HTML5 interactive panels
│   │   │   ├── Masthead.tsx                   # Logo & audio playback toggle
│   │   │   ├── HeroSection.tsx                # Spring panel (Cosmos & Jellyfish)
│   │   │   ├── AboutSection.tsx               # Studio narrative & portrait
│   │   │   ├── ServicesSection.tsx            # Summer panel (Offerings & tech)
│   │   │   ├── WorksCarousel.tsx              # Autumn panel (7 video cards)
│   │   │   ├── ContactForm.tsx                # Winter panel (Anti-bot consultation form)
│   │   │   └── FooterFinale.tsx               # Studio network links & back to top
│   │   └── ui/                                # Atomic primitives (Pill button, Toast, Badge)
│   │
│   ├── hooks/                                 # Custom React hooks
│   │   ├── useWebAudio.ts                     # AudioContext & GainNode volume manager
│   │   ├── useDeviceTier.ts                   # GPU tier detection & capability assessment
│   │   └── useScrollParallax.ts               # GSAP ScrollTrigger synchronization
│   │
│   ├── lib/                                   # Shared utilities & configurations
│   │   ├── supabase.ts                        # Supabase client (Client & Server isolated)
│   │   ├── email.ts                           # Resend transactional email sender
│   │   ├── validation.ts                      # Zod schema definitions
│   │   └── constants.ts                       # Portfolio data & visual constants
│   │
│   ├── shaders/                               # GLSL vertex & fragment shaders
│   │   ├── postprocessing_finish.frag.glsl
│   │   ├── secret_earth_clouds.frag.glsl
│   │   ├── ocean_dunes_caustics.frag.glsl
│   │   └── underwater_bubbles.frag.glsl
│   │
│   └── types/                                 # TypeScript interfaces & database schemas
│       ├── database.ts                        # Generated Supabase table types
│       ├── works.ts                           # Portfolio item data contract
│       └── stage.ts                           # WebGL stage uniforms and rig interfaces
│
└── tests/                                     # Automated test suites
    ├── unit/                                  # Component & utility tests
    ├── integration/                           # Contact API & DB integration tests
    └── e2e/                                   # Playwright browser verification
```

---

## 3. Third-Party APIs & Integration Contracts

### 3.1 Contact Ingestion API (`POST /api/contact`)
- **Runtime:** Edge Runtime / Node.js Serverless.
- **Payload Contract:**
  ```typescript
  export const ContactPayloadSchema = z.object({
    name: z.string().trim().min(2).max(60),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(20).max(1200),
    company_website: z.string().max(0), // Honeypot MUST be empty
    elapsed: z.number().int().min(3000), // Bot threshold: must take >= 3000ms
  });
  ```
- **External Notifications (Resend):**
  - Sends immediate HTML notification to `CONTACT_RECIPIENT_EMAIL` with sanitized client details.
  - Returns sanitized status: `{ success: true, message: "Inquiry received" }`.

### 3.2 External Media Streaming (AWS CloudFront)
- **Domain:** `https://d2crmzpw5das9r.cloudfront.net/`
- **Security:** Video requests enforce `cross-origin` isolated credentials and stream via HTTP range requests (`Accept-Ranges: bytes`).

---

## 4. Security Constraints & Zero-Trust Policies

1. **W3C Content Security Policy (Level 3):**
   ```text
   default-src 'self';
   script-src 'self' 'unsafe-eval'; /* Required for WebGL shader compilation */
   style-src 'self' 'unsafe-inline';
   img-src 'self' data: blob: https://*.cloudfront.net;
   media-src 'self' blob: https://*.cloudfront.net;
   font-src 'self' data:;
   connect-src 'self' https://*.supabase.co https://api.resend.com;
   worker-src 'self' blob:;
   object-src 'none';
   frame-ancestors 'none';
   ```
2. **Server-Side Secret Hygiene:**
   - Client bundles never contain `SUPABASE_SERVICE_ROLE_KEY` or `RESEND_API_KEY`.
   - All server environment variables are validated at build time via `@t3-oss/env-nextjs` or strict Zod validation.
3. **Form Abuse & Rate Limiting:**
   - In-memory / Edge KV sliding window limiter: Max 5 submissions per IP per hour.
