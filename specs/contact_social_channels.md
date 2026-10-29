# Feature Specification: Contact Section Social & Direct Channels

## 1. Overview & Context
- **Feature Name**: Contact Section Social & Direct Channels
- **Feature Target**: `#contact` (`panel--contact`) and `#finale` (`panel--finale`) in Next Label Portfolio
- **User Intent**: Allow prospective clients, employers, and collaborators to reach out not only via the contact form (`imrandt2001@gmail.com`), but also directly through verified professional and social platforms (GitHub, LinkedIn, Facebook, Direct Email).
- **Design Philosophy**: FWA / Awwwards-grade luxury minimalism. Ultra-clean frosted glass pills, hairline borders, crisp vector SVGs (no tacky emojis), micro-interaction hover states with cyan glow (`rgba(127, 243, 255, 0.6)`), and 100% responsive fluid alignment across mobile and desktop.

---

## 2. Technical Architecture & Component Structure

### 2.1 Contact Section Markup (`#contact`)
```html
<div class="contact__socials" data-depth="1.35" data-reveal="rise">
  <p class="contact__socials-label" data-contact-socials-label>Or connect directly:</p>
  <div class="contact__socials-list">
    <a href="https://github.com/Imran7541" target="_blank" rel="noopener noreferrer" class="contact__social-pill" aria-label="GitHub">
      <svg class="contact__social-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">...</svg>
      <span>GitHub</span>
      <span class="contact__social-arrow" aria-hidden="true">↗</span>
    </a>
    <a href="https://www.linkedin.com/in/imran-hosen/" target="_blank" rel="noopener noreferrer" class="contact__social-pill" aria-label="LinkedIn">
      <svg class="contact__social-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">...</svg>
      <span>LinkedIn</span>
      <span class="contact__social-arrow" aria-hidden="true">↗</span>
    </a>
    <a href="https://facebook.com/imranhosen.dev" target="_blank" rel="noopener noreferrer" class="contact__social-pill" aria-label="Facebook">
      <svg class="contact__social-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">...</svg>
      <span>Facebook</span>
      <span class="contact__social-arrow" aria-hidden="true">↗</span>
    </a>
    <a href="mailto:imrandt2001@gmail.com" class="contact__social-pill" aria-label="Direct Email">
      <svg class="contact__social-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">...</svg>
      <span>Email</span>
      <span class="contact__social-arrow" aria-hidden="true">↗</span>
    </a>
  </div>
</div>
```

### 2.2 Security Standards
1. Zero Ambient Authority: All external links open with `target="_blank" rel="noopener noreferrer"` preventing tab-nabbing or `window.opener` leaks.
2. Direct Email channel uses `mailto:imrandt2001@gmail.com` with clean native mail client integration.

### 2.3 Bilingual Localization (`i18n.js`)
- English (`en`): `'Or connect directly:'`
- Bengali (`bn`): `'সরাসরি যোগাযোগ ও সোশ্যাল মাধ্যম:'`

---

## 3. Gherkin BDD Scenarios

```gherkin
Feature: Contact Section Direct Channels & Social Links
  As a visitor or prospective client
  I want to view and click direct links to Imran's GitHub, LinkedIn, Facebook, and Email
  So that I have flexible, immediate ways to get in touch and inspect his work.

  Scenario: Desktop visitor navigates to Contact section
    Given the portfolio is loaded on a desktop browser (width >= 1024px)
    When the visitor navigates to the "#contact" section
    Then the contact form and the direct channels cluster must both be visible
    And the direct channels cluster must display GitHub, LinkedIn, Facebook, and Email pills
    And hovering over any social pill triggers a cyan neon glow and micro-elevation

  Scenario: Mobile visitor navigates to Contact section
    Given the portfolio is loaded on a mobile device (width <= 760px)
    When the visitor views the "#contact" section
    Then the social pills must wrap gracefully without clipping or horizontal scroll
    And the social pills must maintain minimum touch targets of >= 40px
    And the social cluster must not collide with the bottom HUD bar (Sound/Motion/Winter)

  Scenario: Bilingual toggle on Contact section
    Given the visitor switches the language to Bengali ("bn")
    When viewing the Contact section
    Then the direct channels label must switch to "সরাসরি যোগাযোগ ও সোশ্যাল মাধ্যম:"
    And switching back to English ("en") restores "Or connect directly:"
```
