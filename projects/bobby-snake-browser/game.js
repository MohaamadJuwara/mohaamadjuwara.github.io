const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const GRID_W = 25;
const GRID_H = 20;
const CELL = 32;
const GOAL = 10;

let snake = [];
let dx = 1;
let dy = 0;
let queuedDx = 1;
let queuedDy = 0;
let apple = { x: 10, y: 10 };
let score = 0;
let dead = false;
let won = false;
let lastTick = 0;
const MOVE_DELAY_MS = 110;

function resetGame() {
  snake = [{ x: 2, y: 2 }];
  dx = 1;
  dy = 0;
  queuedDx = 1;
  queuedDy = 0;
  score = 0;
  dead = false;
  won = false;
  statusEl.textContent = "Playing";
  statusEl.style.color = "#ffd54d";
  scoreEl.textContent = `Score: ${score} / ${GOAL}`;
  placeApple();
}

function randomInnerCell() {
  return {
    x: Math.floor(Math.random() * (GRID_W - 2)) + 1,
    y: Math.floor(Math.random() * (GRID_H - 2)) + 1,
  };
}

function isOnSnake(x, y) {
  return snake.some((part) => part.x === x && part.y === y);
}

function placeApple() {
  let next = randomInnerCell();
  while (isOnSnake(next.x, next.y)) {
    next = randomInnerCell();
  }
  apple = next;
}

function updateDirection() {
  // Prevent direct 180 turn (same as Java version behavior)
  if (queuedDx !== 0 && dx === 0) {
    dx = queuedDx;
    dy = 0;
  } else if (queuedDy !== 0 && dy === 0) {
    dy = queuedDy;
    dx = 0;
  }
}

function step() {
  if (dead || won) return;

  updateDirection();

  const head = snake[snake.length - 1];
  const nx = head.x + dx;
  const ny = head.y + dy;

  const hitsBorder = nx <= 0 || ny <= 0 || nx >= GRID_W - 1 || ny >= GRID_H - 1;
  const hitsSelf = isOnSnake(nx, ny);

  if (hitsBorder || hitsSelf) {
    dead = true;
    statusEl.textContent = "Game Over - Press R";
    statusEl.style.color = "#ff7a7a";
    return;
  }

  snake.push({ x: nx, y: ny });

  if (nx === apple.x && ny === apple.y) {
    score += 1;
    scoreEl.textContent = `Score: ${score} / ${GOAL}`;
    placeApple();

    if (score >= GOAL) {
      won = true;
      statusEl.textContent = "You Won! - Press R";
      statusEl.style.color = "#7dffb0";
      return;
    }
  } else {
    snake.shift();
  }
}

function drawBackground() {
  ctx.fillStyle = "#15263a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // inner board
  ctx.fillStyle = "#1f3a57";
  ctx.fillRect(CELL, CELL, canvas.width - CELL * 2, canvas.height - CELL * 2);
}

function drawGrid() {
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= GRID_W; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL, 0);
    ctx.lineTo(x * CELL, GRID_H * CELL);
    ctx.stroke();
  }
  for (let y = 0; y <= GRID_H; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL);
    ctx.lineTo(GRID_W * CELL, y * CELL);
    ctx.stroke();
  }
}

function drawBorderBlocks() {
  ctx.fillStyle = "#4caf50";
  for (let x = 0; x < GRID_W; x++) {
    ctx.fillRect(x * CELL + 2, 2, CELL - 4, CELL - 4);
    ctx.fillRect(x * CELL + 2, (GRID_H - 1) * CELL + 2, CELL - 4, CELL - 4);
  }
  for (let y = 1; y < GRID_H - 1; y++) {
    ctx.fillRect(2, y * CELL + 2, CELL - 4, CELL - 4);
    ctx.fillRect((GRID_W - 1) * CELL + 2, y * CELL + 2, CELL - 4, CELL - 4);
  }
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    const part = snake[i];
    const isHead = i === snake.length - 1;
    ctx.fillStyle = isHead ? "#ffd166" : "#43c7ff";
    ctx.fillRect(part.x * CELL + 4, part.y * CELL + 4, CELL - 8, CELL - 8);

    if (isHead) {
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.arc(part.x * CELL + 12, part.y * CELL + 12, 3, 0, Math.PI * 2);
      ctx.arc(part.x * CELL + 20, part.y * CELL + 12, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawApple() {
  const cx = apple.x * CELL + CELL / 2;
  const cy = apple.y * CELL + CELL / 2;
  ctx.fillStyle = "#ff4d5e";
  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#8b5a2b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 10);
  ctx.lineTo(cx + 1, cy - 16);
  ctx.stroke();
}

function drawOverlayText() {
  if (!dead && !won) return;

  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(145, 270, 510, 92);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 30px Segoe UI";
  ctx.textAlign = "center";
  const text = won ? "YOU WON - Press R" : "GAME OVER - Press R";
  ctx.fillText(text, 400, 327);
}

function render() {
  drawBackground();
  drawGrid();
  drawBorderBlocks();
  drawApple();
  drawSnake();
  drawOverlayText();
}

function loop(timestamp) {
  if (!lastTick) lastTick = timestamp;
  const elapsed = timestamp - lastTick;
  if (elapsed >= MOVE_DELAY_MS) {
    step();
    lastTick = timestamp;
  }
  render();
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    queuedDx = -1;
    queuedDy = 0;
    event.preventDefault();
  } else if (event.key === "ArrowRight") {
    queuedDx = 1;
    queuedDy = 0;
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    queuedDx = 0;
    queuedDy = -1;
    event.preventDefault();
  } else if (event.key === "ArrowDown") {
    queuedDx = 0;
    queuedDy = 1;
    event.preventDefault();
  } else if (event.key.toLowerCase() === "r") {
    resetGame();
  }
});

restartBtn.addEventListener("click", resetGame);

resetGame();
requestAnimationFrame(loop);
