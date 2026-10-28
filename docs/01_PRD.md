# 01_PRD.md – Product Requirements Document
## Project: Next Label Portfolio (Creative Agency & Interactive 3D Showcase)
**Version:** 1.0.0  
**Status:** Approved / Architecture-Locked  
**Concept Anchor:** 「深海にも四季がある」 (*"Even the deep sea has four seasons"*)

---

## 1. Executive Summary & Problem Statement

### 1.1 The Problem
High-ticket design and technology clients (real estate developers, luxury brands, corporate innovators) are inundated with homogenous, template-driven digital agency portfolios. Standard static websites fail to demonstrate technical authority in modern web craftsmanship—specifically **real-time 3D (WebGL), GPGPU simulation, kinetic typography, and fluid micro-interactions**.

### 1.2 The Solution
**Next Label Portfolio** is an immersive, high-performance agency website engineered to serve as undeniable proof of elite technical competence. Inspired by the Japanese creative studio [JUNKBRANDING](https://www.junkbranding.com/), the site merges:
1. **Photorealistic and generative 3D WebGL particle graphics** (409,600 simultaneous particles morphing across four seasonal states).
2. **Subtle, ambient Web Audio engineering** that responds dynamically to user interaction.
3. **Rigorous sub-50ms Edge performance** with semantic accessibility (a11y) and zero third-party tracking overhead.

---

## 2. Target Personas & User Journeys

| Persona | Role & Industry | Primary Goal | Critical Conversion Factor |
| :--- | :--- | :--- | :--- |
| **Enterprise Brand Director** | CMO / VP of Brand at luxury / corporate firm | Seeks a digital partner capable of building a world-class flagship web experience. | Visual and kinetic impact within first 5 seconds; instant proof of mastery. |
| **Product & Tech Lead** | CTO / VP Engineering at venture-backed startup | Evaluates technical feasibility, codebase quality, performance, and security. | Sub-second LCP, zero console errors, 60fps WebGL rendering, strict CSP security headers. |
| **Creative Director** | Lead Designer / Agency Producer | Looks for artistic subtlety, typographic sensitivity, and unique motion design. | Japanese Mincho/Sans typography, smooth post-processing blur/bloom, seasonal narrative. |

---

## 3. MVP User Stories (MoSCoW Prioritized)

### Epic 1: Immersive Sensory Landing & Four Seasons Narrative
- **US-101 (Must Have):** *As a visitor*, when I enter the site, I want to experience a smooth loading transition that preloads assets while rendering a procedural canvas motif, so that I understand the caliber of craftsmanship immediately.
- **US-102 (Must Have):** *As a visitor*, when scrolling from top to bottom, I want the WebGL background and DOM panels to guide me through four seasonal phases (Spring Sakura & Jellyfish Morph $\rightarrow$ Summer Fireworks $\rightarrow$ Autumn Momiji $\rightarrow$ Winter Snow & Seabed Dunes), so that exploring the portfolio feels like an evocative narrative journey.
- **US-103 (Should Have):** *As a mobile visitor*, when I tilt my smartphone, I want the camera angle and particles to subtly respond to gyroscope orientation, providing a tactile, physical connection.

### Epic 2: Sound & Ambient Audio Experience
- **US-201 (Must Have):** *As a visitor*, I want a non-intrusive sound toggle in the masthead that allows me to play/mute the bespoke ambient track ("Blue Race"), with smooth volume gain ramps (no harsh clipping).
- **US-202 (Should Have):** *As a visitor*, when switching browser tabs, the audio should automatically fade out and pause, resuming gently when I return.

### Epic 3: Works Showcase & Video Stream
- **US-301 (Must Have):** *As an executive buyer*, I want to browse 7 featured agency projects with instant MP4 video previews, categorized tech stacks, client roles, and live outbound links.
- **US-302 (Should Have):** *As a visitor*, hovering over a work item should dynamically distort the background WebGL shader with fluid ripples and chromatic aberration.

### Epic 4: Lead Ingestion & The "Secret Earth" Easter Egg
- **US-401 (Must Have):** *As a prospective client*, I want to submit a project inquiry via an accessible contact form with real-time validation, knowing my submission is handled securely.
- **US-402 (Must Have):** *As a system administrator*, I want automated bot submissions blocked via hidden honeypot traps and a 3,000ms minimum fill threshold without subjecting human users to frustrating CAPTCHAs.
- **US-403 (Delight/Must Have):** *As a verified submitter*, upon successful message transmission, I want to be transported to the "Secret Earth" modal—a 3D procedural low-orbit Earth globe simulating atmospheric cloud drift.

---

## 4. Success Metrics & Key Performance Indicators (KPIs)

1. **Performance Budget:**
   - **First Contentful Paint (FCP):** $\le 1.2\text{s}$ (Fast 4G/Broadband).
   - **Largest Contentful Paint (LCP):** $\le 2.2\text{s}$.
   - **Cumulative Layout Shift (CLS):** $\le 0.02$.
   - **Framerate:** Stable $60\text{fps}$ on high-tier desktop/mobile; minimum $30\text{fps}$ fallback on low-tier hardware.
2. **Engagement & Conversion:**
   - **Average Dwell Time:** $\ge 90\text{ seconds}$ on landing page.
   - **Soundtrack Engagement:** $\ge 25\%$ visitors activate audio.
   - **Inquiry Completion Rate:** $\ge 3.5\%$ of visitors navigating to the contact section.
3. **Security & Stability:**
   - **Zero Bot Spam:** $100\%$ rejection of non-human form payloads via honeypot and timing heuristics.
   - **A+ Security Rating:** Complete adherence to strict Content Security Policy (CSP Level 3) and HSTS Preload.

---

## 5. Strict Out of Scope (Non-Goals)

To preserve architectural purity and zero-latency performance, the following are strictly excluded:
- ❌ **No Customer Accounts or Public Sign-ups:** Portfolio is publicly consumable. Administrative access is handled via isolated Supabase Auth / service tokens.
- ❌ **No Heavy Third-Party Analytics Trackers:** No Google Tag Manager, Meta Pixel, Hotjar, or third-party tracking cookies that compromise user privacy or degrade lighthouse performance.
- ❌ **No E-Commerce / Payment Gateways:** No Stripe/PayPal checkout. All engagements are bespoke client inquiries routed to direct consultation.
- ❌ **No Arbitrary Client File Uploads:** Form accepts only sanitised text inputs (Name, Email, Message). No binary attachments in the contact form to eliminate malware vectors.
- ❌ **No Multi-Page Full Refreshes:** The primary portfolio experience is single-page and seamlessly state-driven.
