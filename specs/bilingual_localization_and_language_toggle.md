# Feature Specification: Bilingual (English & Bengali) Localization & Language Switcher

```yaml
feature: bilingual_localization_and_language_switcher
version: 1.0.0
standard: Spec-Driven Development (SDD) & Zero-Trust Architecture
author: Antigravity AI Engineering Harness
status: Ready for Implementation
primary_languages:
  - code: "en"
    name: "English"
    default: true
  - code: "bn"
    name: "বাংলা (Bengali)"
```

---

## 1. Context & Business Intent

Google Chrome detected `<html lang="ja">` and legacy Japanese JSON-LD / text markers on `localhost:3002`, triggering an unwanted Google Translate modal (`Japanese -> Bangla`).
The portfolio owner (Imran Hossain, Bangladesh) requires:
1. **Total eradication of Japanese text and metadata**: Default language must be English (`<html lang="en">`).
2. **Native Bilingual Support**: Seamless English (`EN`) and Bengali (`BN`) dual-language capability.
3. **Interactive Language Switcher**: A sleek, accessible, deep-sea-styled switcher (`EN | BN`) integrated directly into the masthead navigation.
4. **State Persistence**: Selected language persists across sessions and page reloads via `localStorage`.

---

## 2. Gherkin BDD Scenarios

```gherkin
Feature: Bilingual Localization and Interactive Language Switcher

  Scenario: Default page load with no prior preference
    Given a user visits the portfolio root URL
    And no language is stored in localStorage
    Then the document language attribute is "en"
    And the page displays text in professional English
    And the masthead displays the active language button as "EN"
    And Google Chrome does not prompt for Japanese translation

  Scenario: User toggles language to Bengali (BN)
    Given the page is loaded in English
    When the user clicks the "BN" language button in the masthead
    Then the document language attribute changes to "bn"
    And all navigation, hero, about, services, works, contact, and finale texts switch to natural Bengali
    And "portfolio_lang" is saved as "bn" in localStorage
    And the active state shifts to "BN"

  Scenario: User reloads the page after selecting Bengali
    Given "portfolio_lang" in localStorage is "bn"
    When the user refreshes the page
    Then the page initializes in Bengali without flickering
    And the document language attribute is "bn"

  Scenario: User switches back to English (EN)
    Given the page is currently in Bengali
    When the user clicks the "EN" language button
    Then the document language attribute changes to "en"
    And all text reverts to English
    And "portfolio_lang" in localStorage updates to "en"
```

---

## 3. Structural & Architectural Impact

1. **`index.html`**:
   - Update `<html lang="ja">` to `<html lang="en">`.
   - Sanitize Schema.org JSON-LD to English with Imran Hossain's Bangladesh credentials.
   - Replace Japanese loader error messages and skip link with English defaults.
   - Insert Language Switcher pill in the Masthead (`<div class="lang-switch"><button data-lang="en" class="is-active">EN</button><button data-lang="bn">BN</button></div>`).
   - Add `data-i18n` attributes to text nodes or drive through a unified `i18n.js` dictionary module.
2. **`public/assets/index-Bc3k1I4L.css`**:
   - Add styling for `.lang-switch`, glowing cyan border on active selection, smooth hover transitions matching `.sound` and `.motion-toggle` buttons.
   - Ensure Bengali typography renders with clean line-height and crisp font fallbacks.
3. **`public/assets/index-BG4wa0Rg.js`**:
   - Remove all Japanese strings and error messages.
   - Integrate bilingual translation engine that safely updates DOM elements and GSAP character-split tags without breaking Three.js / WebGL.
4. **Verification**:
   - `npm test` passes 17/17 tests.
   - Automated Headless browser test verifies switching between EN and BN, checking DOM content and `localStorage`.
