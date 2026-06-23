## 2024-05-22 - Improved screen reader interpretation for symbol icons and fixed keyboard focus visibility

**Learning:** Screen readers may misinterpret basic symbol characters (like '↑', '↓', '←', '→') or they may be confusing for users if read literally as symbols. In addition, interactive elements built without explicit focus indicators (like tailwind's `focus-visible` ring) provide poor navigational context for keyboard users.
**Action:** Always provide explicitly localized and descriptive text via `aria-label` when using symbol icons or basic text characters for button content. Additionally, ensure `focus-visible:outline-none focus-visible:ring-2` (or equivalent styles) are applied to all interactive controls so keyboard navigation is visibly obvious.

## 2024-05-24 - Accessibility and Game Play/Pause state
**Learning:** Adding screen reader support for game states (via `aria-live="polite"`) makes dynamic web games accessible and understandable without visual updates. Additionally, changing game actions from confusing text ("Jogando" which doesn't reflect an action but a state) to actionable states ("Iniciar", "Pausar", "Retomar") provides clear intent. Setting the correct `lang` attribute ensures proper pronunciation by screen readers.
**Action:** Always ensure dynamic UI regions that communicate critical app states have `aria-live="polite"` or `assertive`, and action buttons have clearly actionable text (e.g. "Pause" vs "Playing"). Update the HTML lang tag for non-English applications.
