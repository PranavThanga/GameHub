const canvas = document.createElement('canvas');
canvas.id = 'stars-bg';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

// ── Static stars ────────────────────────────
const STAR_COUNT = 200;
const stars = [];

function generateStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.7  + 0.3,
    });
  }
}

function drawStars() {
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
  });
}

// ── Shooting stars ───────────────────────────
const SHOOTING_STARS = [];
const SPEED          = 12;    // px per frame
const TAIL_LEN       = 120;   // length of the tail in px
const SPAWN_INTERVAL = 5000;  // ms between spawns

function spawnShootingStar() {
  // Always start from the top portion of the screen, random x
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.4;

  // Angle: always travelling downward and to the right (between 20° and 60°)
  const angle = (Math.random() * 40 + 20) * (Math.PI / 180);

  SHOOTING_STARS.push({
    x, y,
    vx: Math.cos(angle) * SPEED,
    vy: Math.sin(angle) * SPEED,
    opacity: 1,
    tail: [],   // stores previous positions for the gradient tail
  });
}

function updateShootingStars() {
  for (let i = SHOOTING_STARS.length - 1; i >= 0; i--) {
    const s = SHOOTING_STARS[i];

    // Record current position in tail before moving
    s.tail.push({ x: s.x, y: s.y });
    if (s.tail.length > TAIL_LEN) s.tail.shift();

    s.x += s.vx;
    s.y += s.vy;
    s.opacity -= 0.012;   // fade out over time

    // Remove once off-screen or fully faded
    if (s.opacity <= 0 || s.x > window.innerWidth || s.y > window.innerHeight) {
      SHOOTING_STARS.splice(i, 1);
    }
  }
}

function drawShootingStars() {
  SHOOTING_STARS.forEach(s => {
    if (s.tail.length < 2) return;

    // Draw the tail as a gradient line from transparent → white
    const tail = s.tail;
    const gradient = ctx.createLinearGradient(
      tail[0].x, tail[0].y,             // tail start (oldest, transparent)
      tail[tail.length - 1].x,          // tail end (newest, bright)
      tail[tail.length - 1].y
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

    ctx.beginPath();
    ctx.moveTo(tail[0].x, tail[0].y);
    for (let i = 1; i < tail.length; i++) {
      ctx.lineTo(tail[i].x, tail[i].y);
    }
    ctx.strokeStyle = gradient;
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    // Bright head dot
    ctx.beginPath();
    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
    ctx.fill();
  });
}

// ── Animation loop ───────────────────────────
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  updateShootingStars();
  drawShootingStars();
  requestAnimationFrame(loop);
}

// ── Resize ───────────────────────────────────
function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  resize();
  generateStars();
});

// ── Init ─────────────────────────────────────
resize();
generateStars();
setInterval(spawnShootingStar, SPAWN_INTERVAL);
loop();