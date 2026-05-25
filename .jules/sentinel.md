## 2026-05-22 - Missing Security Headers
**Vulnerability:** The application was missing basic security headers, specifically a Content Security Policy (CSP).
**Learning:** While the app is simple and frontend-only, adding a CSP is an easy way to provide defense-in-depth against XSS.
**Prevention:** Always include a baseline CSP in new web applications.

## 2025-02-21 - Unsafe Eval in CSP
**Vulnerability:** The `index.html` file contained a `Content-Security-Policy` with `script-src` allowing `'unsafe-eval'`.
**Learning:** Modern bundlers like Vite no longer need `'unsafe-eval'` for development or production. Leaving it allows potential XSS via strings passed to `eval()`, `setTimeout()`, etc.
**Prevention:** Remove `'unsafe-eval'` from CSP when configuring static assets via Vite, unless specifically required by a known dependency.
