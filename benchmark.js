const BOARD_SIZE = 16;
const snake = [
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 8 },
  { x: 4, y: 8 },
  { x: 3, y: 8 },
  { x: 2, y: 8 },
  { x: 1, y: 8 },
  { x: 0, y: 8 },
  { x: 0, y: 9 },
  { x: 0, y: 10 },
];

function oldWay() {
  const snakeLookup = new Map(
    snake.map((segment, index) => [`${segment.x},${segment.y}`, index]),
  );

  return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
    const x = index % BOARD_SIZE;
    const y = Math.floor(index / BOARD_SIZE);
    const cellKey = `${x},${y}`;
    const snakeIndex = snakeLookup.get(cellKey);
    return snakeIndex;
  });
}

function newWay() {
  const snakeLookup = new Int32Array(BOARD_SIZE * BOARD_SIZE).fill(-1);
  for (let i = 0; i < snake.length; i++) {
    snakeLookup[snake[i].y * BOARD_SIZE + snake[i].x] = i;
  }

  return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
    const snakeIndex = snakeLookup[index];
    return snakeIndex;
  });
}

console.time("oldWay");
for (let i = 0; i < 10000; i++) oldWay();
console.timeEnd("oldWay");

console.time("newWay");
for (let i = 0; i < 10000; i++) newWay();
console.timeEnd("newWay");
