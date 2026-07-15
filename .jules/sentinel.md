## 2026-05-22 - Missing Security Headers
**Vulnerability:** The application was missing basic security headers, specifically a Content Security Policy (CSP).
**Learning:** While the app is simple and frontend-only, adding a CSP is an easy way to provide defense-in-depth against XSS.
**Prevention:** Always include a baseline CSP in new web applications.
## 2026-06-30 - Secure LocalStorage Access
**Vulnerability:** Missing input validation and error handling on window.localStorage access.
**Learning:** In strict browser environments or due to tampering, localStorage access can throw exceptions or return invalid data, potentially crashing the app or causing undefined behavior.
**Prevention:** Wrap localStorage calls in try/catch blocks and always validate/sanitize the retrieved data before using it.
