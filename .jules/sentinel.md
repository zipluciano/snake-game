## 2026-05-22 - Missing Security Headers

**Vulnerability:** The application was missing basic security headers, specifically a Content Security Policy (CSP).
**Learning:** While the app is simple and frontend-only, adding a CSP is an easy way to provide defense-in-depth against XSS.
**Prevention:** Always include a baseline CSP in new web applications.
