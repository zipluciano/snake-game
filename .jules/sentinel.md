## 2026-05-22 - Missing Security Headers
**Vulnerability:** The application was missing basic security headers, specifically a Content Security Policy (CSP).
**Learning:** While the app is simple and frontend-only, adding a CSP is an easy way to provide defense-in-depth against XSS.
**Prevention:** Always include a baseline CSP in new web applications.
## 2026-05-23 - [Remove unsafe-eval from CSP]
**Vulnerability:** The 'unsafe-eval' directive in Content-Security-Policy script-src allowed execution of strings as JavaScript.
**Learning:** Vite/React projects do not need 'unsafe-eval' for production builds. Leaving it in the CSP introduces unnecessary XSS risks.
**Prevention:** Avoid allowing 'unsafe-eval' in the script-src directive for production applications.
