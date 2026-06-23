## 2024-06-11 - Fast 2D Grid Coordinate Tracking in React

**Learning:** Tracking 2D grid coordinates with strings (e.g., \`\${x},\${y}\`) as keys in \`Map\` or \`Set\` structures inside of \`useMemo\` or frequent render cycles creates significant performance overhead due to constant string allocation and garbage collection.
**Action:** Replace string-based 2D lookups with 1D typed arrays (\`Int8Array\` or \`Int32Array\`) using the formula \`index = y \* width + x\`. This avoids memory allocation during the render cycle and is roughly 3x-6x faster for lookups and iterations.

## 2024-06-23 - Game Loop Interval Reset Optimization

**Learning:** React state variables (like `queuedDirection` or `food` position) mapped directly as dependencies of a game loop `setInterval` inside `useEffect` will unmount and recreate the interval with every update. This effectively interrupts the game loop cadence (e.g. keypresses resetting the timer making the snake seem to 'freeze' or speed up sporadically).
**Action:** Use `useRef` to hold rapidly changing game loop state variables that are needed inside closures without triggering `useEffect` dependency updates, while syncing them with React state if they are needed for rendering.
