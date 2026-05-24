## 2026-05-22 - Missing Security Headers
**Vulnerability:** The application was missing basic security headers, specifically a Content Security Policy (CSP).
**Learning:** While the app is simple and frontend-only, adding a CSP is an easy way to provide defense-in-depth against XSS.
**Prevention:** Always include a baseline CSP in new web applications.
## 2024-05-24 - Enhance localStorage Resilience
**Vulnerability:** Application could crash if browser privacy settings or extensions block `localStorage` access, and state could be corrupted if arbitrary data was injected into `localStorage`.
**Learning:** React applications relying on browser storage must account for scenarios where storage APIs throw errors (e.g., `SecurityError`), especially when reading values on component mount.
**Prevention:** Always wrap `localStorage` access in `try/catch` blocks. Additionally, validate and sanitize values read from client-side storage before using them in application state, as they are a vector for untrusted input.
