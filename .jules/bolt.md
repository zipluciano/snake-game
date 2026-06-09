## 2024-06-11 - Fast 2D Grid Coordinate Tracking in React
**Learning:** Tracking 2D grid coordinates with strings (e.g., \`\${x},\${y}\`) as keys in \`Map\` or \`Set\` structures inside of \`useMemo\` or frequent render cycles creates significant performance overhead due to constant string allocation and garbage collection.
**Action:** Replace string-based 2D lookups with 1D typed arrays (\`Int8Array\` or \`Int32Array\`) using the formula \`index = y * width + x\`. This avoids memory allocation during the render cycle and is roughly 3x-6x faster for lookups and iterations.
## 2024-05-18 - Grid Cell Render Node Caching
**Learning:** In a dense React grid (like a Snake board), generating elements using `Array.from` and re-evaluating every node's type dynamically inside the render loop causes significant overhead in allocation and object creation, even if only a few cells (snake and food) differ from the empty state.
**Action:** Caching a base array of pre-instantiated empty grid elements (`React.createElement`) outside of the component and cloning that array on render reduces iteration time drastically (e.g. from ~67,000ms to ~800ms for 100k render cycles).
