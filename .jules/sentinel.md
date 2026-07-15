## 2026-05-22 - Missing Security Headers
**Vulnerability:** The application was missing basic security headers, specifically a Content Security Policy (CSP).
**Learning:** While the app is simple and frontend-only, adding a CSP is an easy way to provide defense-in-depth against XSS.
**Prevention:** Always include a baseline CSP in new web applications.
## 2024-06-23 - Prevent potential NaN in High Score
**Vulnerability:** Reading `snake-high-score` from `localStorage` uses `Number(savedHighScore)`. If a malicious user or corrupted state sets the storage value to a non-numeric string, it results in `NaN` leading to potential bugs in `Math.max()` scoring.
**Learning:** `localStorage` values are strings and must be parsed and validated cautiously to ensure they are the correct type before updating state.
**Prevention:** Added a fallback `|| 0` when parsing `savedHighScore` to ensure the high score state is always numeric.
