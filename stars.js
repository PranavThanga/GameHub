const canvas = document.createElement('canvas');
canvas.id = 'stars-bg';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

const STAR_COUNT = 200;
const stars = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function generateStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 1.5 + 0.3,   // radius between 0.3 and 1.8px
      opacity: Math.random() * 0.7  + 0.3,  // opacity between 0.3 and 1.0
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
  });
}

// Regenerate on resize so stars always fill the screen
window.addEventListener('resize', () => {
  resize();
  generateStars();
  draw();
});

resize();
generateStars();
draw();