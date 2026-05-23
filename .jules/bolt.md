## 2024-06-11 - Fast 2D Grid Coordinate Tracking in React
**Learning:** Tracking 2D grid coordinates with strings (e.g., \`\${x},\${y}\`) as keys in \`Map\` or \`Set\` structures inside of \`useMemo\` or frequent render cycles creates significant performance overhead due to constant string allocation and garbage collection.
**Action:** Replace string-based 2D lookups with 1D typed arrays (\`Int8Array\` or \`Int32Array\`) using the formula \`index = y * width + x\`. This avoids memory allocation during the render cycle and is roughly 3x-6x faster for lookups and iterations.
## 2026-05-23 - Prevent Interval Resets via User Input Tracking
**Learning:** Using `useState` to buffer user input (like direction in a Snake game) and placing that state in a game-loop `useEffect` dependency array causes the `setInterval` to be torn down and recreated on every keystroke, resulting in severe gameplay stuttering.
**Action:** Always track high-frequency user input needed inside active intervals with `useRef` to decouple input handling from the React render cycle and prevent premature interval clears.
