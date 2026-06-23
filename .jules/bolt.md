## 2024-06-11 - Fast 2D Grid Coordinate Tracking in React

**Learning:** Tracking 2D grid coordinates with strings (e.g., \`\${x},\${y}\`) as keys in \`Map\` or \`Set\` structures inside of \`useMemo\` or frequent render cycles creates significant performance overhead due to constant string allocation and garbage collection.
**Action:** Replace string-based 2D lookups with 1D typed arrays (\`Int8Array\` or \`Int32Array\`) using the formula \`index = y \* width + x\`. This avoids memory allocation during the render cycle and is roughly 3x-6x faster for lookups and iterations.
