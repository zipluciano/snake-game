## 2026-05-22 - Missing Security Headers
**Vulnerability:** The application was missing basic security headers, specifically a Content Security Policy (CSP).
**Learning:** While the app is simple and frontend-only, adding a CSP is an easy way to provide defense-in-depth against XSS.
**Prevention:** Always include a baseline CSP in new web applications.
## 2026-05-26 - [Validate LocalStorage Access]
**Vulnerability:** Untrusted data from localStorage was parsed and set directly into React state without validation, which could crash the app or introduce invalid UI state if manipulated. The access was also not wrapped in a try/catch, meaning in strict privacy environments (e.g., incognito with blocked local storage), the app could crash.
**Learning:** External storage (like localStorage, sessionStorage, cookies) should always be treated as untrusted user input, especially before coercing and passing it to state management. Moreover, accessing external storage is a side-effect that can throw errors depending on browser configuration.
**Prevention:** Always validate and sanitize data retrieved from client-side storage before using it in the application logic. Always wrap calls to `window.localStorage.getItem` and `setItem` in `try...catch` blocks to ensure the application fails securely and gracefully without crashing.
