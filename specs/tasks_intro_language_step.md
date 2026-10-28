# Implementation Tasks: Intro Language Selection Step (Loader Sequence)

```yaml
feature: intro_language_selection_sequence
user_requirement: "Remove masthead EN/BN button. Show sound/nonsound first, then language select (EN/BN), then dissolve into site."
phase: Implementation & Verification
```

- [x] **Task 1: Update Loader Markup in `index.html`**
  - Add two-step loader choices:
    - Step 1: `[data-loader-step="sound"]` with `Enter with sound` & `Without sound`
    - Step 2: `[data-loader-step="lang"]` with `English (EN)` & `বাংলা (BN)`
  - Remove `.lang-switch` from `<header class="masthead">` restoring the pristine top nav layout.

- [x] **Task 2: Implement Two-Step Enter Sequence in `public/assets/index-BG4wa0Rg.js`**
  - Update `waitForChoice()`:
    1. Listen for sound choice.
    2. When clicked, smoothly fade out sound buttons (250ms).
    3. Smoothly fade in language choice buttons (`English (EN)` / `বাংলা (BN)`).
    4. When language choice is clicked, set language via `setPortfolioLanguage()`.
    5. Resolve promise and trigger `z_.finish()` so loader dissolves smoothly into the 3D portfolio.

- [x] **Task 3: Refine `public/assets/i18n.js` and CSS Animations**
  - Ensure `setPortfolioLanguage()` smoothly reacts to `data-enter-lang` clicks.
  - Style `.loader__choices[data-loader-step="lang"]` with smooth opacity and translateY transitions.

- [x] **Task 4: Automated Verification & Regression Testing**
  - Update `tests/test_server_live.py` test 13 for the new intro loader sequence.
  - Run `npm test` (all 18 tests passing).
  - Test live in headless Chrome to confirm sound -> lang -> dissolve sequence.
  - Update `notes/PROJECT_STATE.md` and `notes/AGENT_HANDOVER.md`.
