let fontSize = 18;
let spread = 8;
let adjustX = 8;
let adjustY = 22;
let radius = 100;
let densityMin = 5;
let densityMax = 60;
let lineDensity = 25;
let lineWidth = 1;
let canvasHeight = window.innerHeight * 0.8;
let canvasWidth = window.window.innerWidth * 0.8;
let arcSize = 1;

if (window.innerWidth >= 1500) {
  adjustX = 15.5;
}

if (window.innerWidth <= 1200) {
  spread = 6;
  adjustX = 10;
  adjustY = 31;
  radius = 80;
  lineDensity = 18;
  densityMax = 45;
}

if (window.innerWidth <= 1000) {
  spread = 4.7;
  adjustX = 13;
  adjustY = 39;
  radius = 80;
  lineDensity = 15;
  densityMax = 45;
}

if (window.innerWidth <= 850) {
  adjustX = 6.5;
  canvasHeight = window.innerHeight;
  canvasWidth = window.innerWidth;
}

if (window.innerWidth <= 750) {
  spread = 5.5;
  adjustX = 5.2;
  adjustY = 20;
  radius = 80;
  lineDensity = 18;
  densityMax = 45;
}

if (window.innerWidth <= 620) {
  spread = 4.6;
  adjustX = 6.5;
  adjustY = 25;
  radius = 80;
  lineDensity = 15;
}

if (window.innerWidth <= 480) {
  spread = 3.1;
  adjustX = 10;
  adjustY = 38;
  radius = 60;
  lineDensity = 12;
  arcSize = 0.6;
}


export default {
  canvas: {
    height: canvasHeight,
    width: canvasWidth,
  },
  fontSize,
  color: "white",
  text: "investoom",
  font: fontSize + "px Verdana",
  radius,
  arcSize,
  adjust: {
    x: adjustX,
    y: adjustY,
  },
  dataSize: {
    x: 35,
    y: 100,
  },
  density: {
    min: densityMin,
    max: densityMax,
  },
  resetFriction: 6,
  activeThreshold: 110,
  spread,
  lineDensity,
  lineWidth,
};
