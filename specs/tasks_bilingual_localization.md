# Implementation Tasks: Bilingual (English & Bengali) Localization & Language Switcher

```yaml
feature: bilingual_localization_and_language_switcher
total_tasks: 6
phase: Completed & Verified
```

- [x] **Task 1: Eradicate Japanese Meta & Text in `index.html`**
  - Set `<html lang="en">` as default.
  - Sanitized Schema.org JSON-LD to English (`inLanguage: "en"`, Imran Hossain, Bangladesh, Next Label Studio).
  - Replaced skip-link text: `Skip to contact form`.
  - Replaced loader warnings and buttons with English defaults (`Loading...`, `Try again`, `Lightweight mode`).
  - Total Japanese characters in `index.html`: 0.

- [x] **Task 2: Build Complete Bilingual (EN / BN) Dictionary**
  - Constructed comprehensive `public/assets/i18n.js` with natural, polished, high-standard Bengali and English dictionaries.
  - Covers Masthead, Navigation, Hero, About, Services 01-08, Works 01-08 details, Contact, Finale, Secret Earth, and Loader.

- [x] **Task 3: Masthead Language Switcher UI & Styling**
  - Added `<div class="lang-switch"><button type="button" class="lang-btn is-active" data-lang="en">EN</button><span class="lang-divider">/</span><button type="button" class="lang-btn" data-lang="bn">BN</button></div>` inside `<header class="masthead">`.
  - Added responsive CSS in `public/assets/index-Bc3k1I4L.css` with deep-sea glassmorphic pill, cyan glow on active selection, and clean typography fallbacks (`'Hind Siliguri'`, `'Kalpurush'`, `'Noto Sans Bengali'`).

- [x] **Task 4: Interactive Client-Side Localization Engine**
  - Implemented `public/assets/i18n.js` with `localStorage` persistence (`portfolio_lang`).
  - Dynamically updates text across all sections, input placeholders, aria labels, and active works details without disrupting Three.js or GSAP.
  - Updates `document.documentElement.lang` to match selected language (`en` or `bn`).

- [x] **Task 5: Sanitize Remaining Japanese Strings in Production JS Bundle**
  - Replaced loader error messages, font preloading strings, and fallback text in `public/assets/index-BG4wa0Rg.js` with clean English strings.

- [x] **Task 6: Verification & Test Automation**
  - Added `test_13_bilingual_language_switcher_and_zero_japanese` to `tests/test_server_live.py`.
  - All 18 automated tests passing (`npm test`).
  - Verified DOM in Headless Chrome (`<html lang="en">`, 0 Japanese tokens).
  - Confirmed Google Chrome translation bar will not trigger.
  - Updated `notes/PROJECT_STATE.md` and `notes/AGENT_HANDOVER.md`.
