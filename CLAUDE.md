# CLAUDE.md – AI Coding Agent Architecture & Execution Protocol
## Project: Next Label Portfolio (Creative Agency & 3D Interactive Showcase)

> **MANDATORY INSTRUCTION FOR CLAUDE CODE / CURSOR / AI AGENTS:**  
> Before executing ANY task, creating files, or writing a single line of code, you **MUST** read and internalize the **6-Document Context Architecture** located in the `docs/` directory.

---

## 1. The 6-Document Context Architecture (Source of Truth)

You must read these documents in order before beginning work:

1. **[`docs/01_PRD.md`](docs/01_PRD.md)**: Core Problem, Target Personas, MVP User Stories, Success Metrics, and strict "Out of Scope (Non-Goals)".
2. **[`docs/02_AppFlow.md`](docs/02_AppFlow.md)**: Screen-by-Screen State Machine, Navigation Routes, Button Actions, and Error/Empty-State Handling.
3. **[`docs/03_UI_Spec.md`](docs/03_UI_Spec.md)**: Design System Tokens, Exact Hex Palette, Typography Scale, Spacing Rules, and Core Component States.
4. **[`docs/04_TRD.md`](docs/04_TRD.md)**: Locked Tech Stack with Exact Library Versions, Folder Structure, Third-Party APIs, and Security Constraints.
5. **[`docs/05_Schema.md`](docs/05_Schema.md)**: Complete Relational Database Schema (PostgreSQL/Supabase DDL, Columns, Foreign Keys, Indexes, and Row-Level Security Policies).
6. **[`docs/06_Plan.md`](docs/06_Plan.md)**: Atomic, Sequential Implementation Checklist ordered by dependency (Phase 1 to Phase 6).

---

## 2. Mandatory Agent Workflow ("Agent = Model + Harness")

1. **No Speculative Code (No YOLO Mode):**
   - Implement ONLY what is specified in `docs/06_Plan.md`.
   - Never introduce unrequested dependencies, predictive features, or unrequested abstractions.
2. **State & Plan Synchronization Protocol:**
   - **Before starting a task:** Identify the exact subtask in `docs/06_Plan.md`.
   - **After completing a task:**
     1. Run automated verification tests (`python3 -m unittest discover tests` or `pnpm test`).
     2. Update `docs/06_Plan.md` by marking the task as completed: `[x]`.
     3. Update `notes/PROJECT_STATE.md` with progress.
     4. Maintain `notes/AGENT_HANDOVER.md` as a concise 1-paragraph directive so subsequent agent sessions resume with zero context loss.
3. **Zero-Trust Security & Seven-Pillar Safety Harness:**
   - **Never hardcode secrets:** All credentials must be read from `.env` and documented in `.env.example`.
   - **Backend Default-Deny:** Always enable Row-Level Security (RLS) on database tables.
   - **Never trust client input:** All endpoints must sanitize inputs via Zod schemas, enforce honeypot checks, and evaluate timing thresholds.
4. **WebGL & High-Performance Standards:**
   - Maintain 60fps framerate target.
   - Always honor `(prefers-reduced-motion: reduce)` and device GPU tiering fallback.
   - Gracefully handle `webglcontextlost` and `webglcontextrestored`.

---

## 3. Standard Commands & Verification Runbook

| Operation | Command | Purpose |
| :--- | :--- | :--- |
| **Integrity Tests** | `python3 -m unittest discover tests` | Validates asset checksums, schema integrity, and document presence. |
| **Install Dependencies**| `pnpm install` | Installs pinned versions from `docs/04_TRD.md`. |
| **Development Server** | `pnpm dev` | Starts local Next.js dev server on `http://localhost:3000`. |
| **Type Check & Lint** | `pnpm lint && pnpm tsc --noEmit` | Verifies TypeScript and ESLint standards. |
| **Production Build** | `pnpm build` | Executes static generation and edge bundle compilation. |
| **End-to-End Tests** | `pnpm test:e2e` | Runs Playwright browser verification suite. |

---

## 4. Architectural Rules & File Placement

- **Components:** Place in `src/components/canvas/` (Three.js WebGL) or `src/components/dom/` (Semantic UI).
- **Hooks:** Place in `src/hooks/` (e.g., `useWebAudio.ts`, `useDeviceTier.ts`).
- **Shaders:** Save custom GLSL vertex/fragment code in `src/shaders/*.glsl`.
- **Assets:** Store videos, audio, images, and branding in `src/assets/`.
- **API Endpoints:** Place in `src/app/api/*/route.ts` with explicit Zod validation.
