const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

const WORLD_SIZE = 800;
const EDGE_MIN = 10;
const EDGE_MAX = 790;
const FISH_SPEED = 4;
const CRAB_SPEED = 4;
const TURN_SPEED = 4;
const FISH_TURN_ON_EDGE = 40;
const COLLISION_DISTANCE = 28;

const keys = {
  left: false,
  right: false,
  up: false,
  down: false,
};

let crab;
let fishList;
let score;
let animationId;

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function moveForward(actor, amount) {
  const r = toRadians(actor.angle);
  actor.x += Math.cos(r) * amount;
  actor.y += Math.sin(r) * amount;
}

function drawFish(fish) {
  ctx.save();
  ctx.translate(fish.x, fish.y);
  ctx.rotate(toRadians(fish.angle));

  // Body
  ctx.fillStyle = "#1ed0ff";
  ctx.beginPath();
  ctx.ellipse(-5, 0, 18, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tail
  ctx.beginPath();
  ctx.moveTo(13, 0);
  ctx.lineTo(24, -10);
  ctx.lineTo(24, 10);
  ctx.closePath();
  ctx.fill();

  // Eye
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(-12, -2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(-11.5, -2.5, 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCrab() {
  ctx.save();
  ctx.translate(crab.x, crab.y);
  ctx.rotate(toRadians(crab.angle));

  ctx.fillStyle = "#dc3c28";

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Claws
  ctx.fillRect(-28, -10, 12, 6);
  ctx.fillRect(16, -10, 12, 6);
  ctx.beginPath();
  ctx.arc(-28, -10, 4, 0, Math.PI * 2);
  ctx.arc(28, -10, 4, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  ctx.fillRect(-14, 12, 4, 9);
  ctx.fillRect(-6, 14, 4, 9);
  ctx.fillRect(2, 14, 4, 9);
  ctx.fillRect(10, 12, 4, 9);

  // Eyes
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(-6, -2, 3, 0, Math.PI * 2);
  ctx.arc(6, -2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(-5, -3, 1.3, 0, Math.PI * 2);
  ctx.arc(7, -3, 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function clampInsideWorld(actor) {
  actor.x = Math.max(0, Math.min(WORLD_SIZE, actor.x));
  actor.y = Math.max(0, Math.min(WORLD_SIZE, actor.y));
}

function updateFish(fish) {
  moveForward(fish, FISH_SPEED);

  if (fish.x >= EDGE_MAX || fish.y >= EDGE_MAX || fish.x <= EDGE_MIN || fish.y <= EDGE_MIN) {
    fish.angle += FISH_TURN_ON_EDGE;
  }
}

function updateCrab() {
  if (keys.left) {
    moveForward(crab, -CRAB_SPEED);
  }
  if (keys.right) {
    moveForward(crab, CRAB_SPEED);
  }
  if (keys.up) {
    crab.angle -= TURN_SPEED;
  }
  if (keys.down) {
    crab.angle += TURN_SPEED;
  }

  clampInsideWorld(crab);
}

function eatFish() {
  fishList = fishList.filter((fish) => {
    const dx = fish.x - crab.x;
    const dy = fish.y - crab.y;
    const distance = Math.hypot(dx, dy);

    if (distance < COLLISION_DISTANCE) {
      score += 1;
      scoreEl.textContent = `Score: ${score}`;
      return false;
    }
    return true;
  });
}

function drawBackground() {
  ctx.fillStyle = "#0069b4";
  ctx.fillRect(0, 0, WORLD_SIZE, WORLD_SIZE);
}

function drawWinText() {
  if (fishList.length === 0) {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.fillRect(180, 360, 440, 90);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 36px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText("All fish eaten!", 400, 417);
    ctx.restore();
  }
}

function gameLoop() {
  drawBackground();

  updateCrab();
  for (const fish of fishList) {
    updateFish(fish);
    drawFish(fish);
  }
  eatFish();
  drawCrab();
  drawWinText();

  animationId = requestAnimationFrame(gameLoop);
}

function createInitialState() {
  crab = { x: 400, y: 400, angle: 0 };
  fishList = [
    { x: 200, y: 200, angle: 0 },
    { x: 400, y: 150, angle: 0 },
    { x: 600, y: 500, angle: 0 },
  ];
  score = 0;
  scoreEl.textContent = "Score: 0";
}

function onKey(event, pressed) {
  if (event.key === "ArrowLeft") keys.left = pressed;
  if (event.key === "ArrowRight") keys.right = pressed;
  if (event.key === "ArrowUp") keys.up = pressed;
  if (event.key === "ArrowDown") keys.down = pressed;
}

window.addEventListener("keydown", (event) => onKey(event, true));
window.addEventListener("keyup", (event) => onKey(event, false));

restartBtn.addEventListener("click", () => {
  createInitialState();
});

createInitialState();
cancelAnimationFrame(animationId);
gameLoop();
