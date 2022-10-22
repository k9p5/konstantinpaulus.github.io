import cfg from "./particles.config.js";

// get canvas
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

// set full screen
canvas.width = cfg.canvas.width;
canvas.height = cfg.canvas.height;

let particleArray = [];

// save mouse movements
const mouse = {
  x: null,
  y: null,
  radius: cfg.radius,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// init font drawing
ctx.fillStyle = cfg.color;
ctx.font = cfg.font;
ctx.fillText(cfg.text, 0, cfg.fontSize);

// get text data
const dataCoordinates = ctx.getImageData(0, 0, cfg.dataSize.y, cfg.dataSize.x);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = cfg.arcSize;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density =
      Math.random() * cfg.density.max - cfg.density.min + cfg.density.min;
  }

  draw() {
    ctx.fillStyle = cfg.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / cfg.resetFriction;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / cfg.resetFriction;
      }
    }
  }
}

const drawLines = () => {
  let opacityValue = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      opacityValue = 1 - distance / cfg.lineDensity;
      ctx.strokeStyle = "rgba(255,255,255," + opacityValue + ")";

      if (distance < cfg.lineDensity) {
        ctx.lineWidth = cfg.lineWidth;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
};

// initialize particles
(() => {
  particleArray = [];
  for (let y = 0, y2 = dataCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = dataCoordinates.width; x < x2; x++) {
      if (
        dataCoordinates.data[y * 4 * dataCoordinates.width + x * 4 + 3] >
        cfg.activeThreshold
      ) {
        let positionX = (x + cfg.adjust.x) * cfg.spread;
        let positionY = (y + cfg.adjust.y) * cfg.spread;
        particleArray.push(new Particle(positionX, positionY));
      }
    }
  }
})();

// recursively update animation
const animate = () => {
  if (mouse.y < cfg.canvas.height && mouse.x < cfg.canvas.width) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
    }
    drawLines();
  }
  requestAnimationFrame(animate);
};
animate();
