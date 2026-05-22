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
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`))
  const available = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!occupied.has(`${x},${y}`)) {
        available.push({ x, y })
      }
    }
  }

  return available[Math.floor(Math.random() * available.length)]
}

function newWay() {
  const occupied = new Int8Array(BOARD_SIZE * BOARD_SIZE)
  for (let i = 0; i < snake.length; i++) {
    occupied[snake[i].y * BOARD_SIZE + snake[i].x] = 1
  }

  const available = []
  for (let index = 0; index < BOARD_SIZE * BOARD_SIZE; index++) {
    if (occupied[index] === 0) {
      available.push({ x: index % BOARD_SIZE, y: Math.floor(index / BOARD_SIZE) })
    }
  }

  return available[Math.floor(Math.random() * available.length)]
}

console.time('oldWay');
for (let i = 0; i < 10000; i++) oldWay();
console.timeEnd('oldWay');

console.time('newWay');
for (let i = 0; i < 10000; i++) newWay();
console.timeEnd('newWay');
