## 2024-06-11 - Fast 2D Grid Coordinate Tracking in React
**Learning:** Tracking 2D grid coordinates with strings (e.g., \`\${x},\${y}\`) as keys in \`Map\` or \`Set\` structures inside of \`useMemo\` or frequent render cycles creates significant performance overhead due to constant string allocation and garbage collection.
**Action:** Replace string-based 2D lookups with 1D typed arrays (\`Int8Array\` or \`Int32Array\`) using the formula \`index = y * width + x\`. This avoids memory allocation during the render cycle and is roughly 3x-6x faster for lookups and iterations.
## 2024-05-18 - Avoiding String Allocations in High-Frequency React Renders
**Learning:** In a fast-paced game loop (140ms tick), using string allocations for thousands of cell React keys (like `${x},${y}`) and complex array initializations (`Array.from` with repeated coordinate math) adds immense garbage collection pressure, leading to measurable frame drops over time.
**Action:** When working with high-frequency board games in React, pre-allocate grid arrays and use simple loop indices for both logic lookups and React `key` props, avoiding `Array.from` overhead and dynamic string creation altogether.
