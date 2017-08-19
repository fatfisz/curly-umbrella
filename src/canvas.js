import audioContext from 'audioContext';
import { beatValue, lineAngles, treeAngles } from 'beatStore';
import { circle } from 'consts';
import svgImage from 'svgImage';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const ratio = 16 / 9;
let width;
let height;
let resized = true;

function coords(x, y) {
  return [width * x, height * y];
}

function coordX(x) {
  return width * x;
}

function coordY(y) {
  return height * y;
}

function setSizeFromWindow() {
  width = window.innerWidth;
  height = window.innerHeight;
  width = Math.min(width, Math.floor(innerHeight * ratio));
  height = Math.min(height, Math.floor(width / ratio));
  canvas.width = width;
  canvas.height = height;
}

const tree = svgImage(`
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
    <path
      d="M15.5 44v5h10v-5m-5-43L39 44H1z"
      fill="none"
      stroke="rgba(0, 0, 0, 0.3)"
      stroke-dasharray="4 1.5"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
`);

const midX = 0.2;
const midY = 10;
const baseRadius = 9.2;

function sizeMultiplier() {
  return coordY(baseRadius) / 4000;
}

function drawTree(radius, angle, size) {
  const multiplier = sizeMultiplier() * size;
  const width = tree.width * multiplier;
  const height = tree.height * multiplier;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  context.setTransform(cos, sin, -sin, cos, ...coords(midX, midY));
  context.drawImage(tree, -width / 2, -radius - height, width, height);
}

function treeCleanup() {
  context.setTransform(1, 0, 0, 1, 0, 0);
}

function lineSetup() {
  context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  context.lineWidth = sizeMultiplier() * 2;
  context.setLineDash([sizeMultiplier() * 4, sizeMultiplier() * 1.5]);
}

function drawLine(radius, angle) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  context.beginPath();
  context.setTransform(cos, sin, -sin, cos, ...coords(midX, midY));
  context.moveTo(0, -radius -coordY(1));
  context.lineTo(0, coordY(0));
  context.stroke();
}

function lineCleanup() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.setLineDash([]);
}

function draw(now = 0) {
  requestAnimationFrame(draw);
  if (resized) {
    resized = false;
    setSizeFromWindow();
  }

  const offset = now / 20000;
  const radius = coordY(baseRadius + beatValue() / 500 * baseRadius);

  context.fillStyle = '#BBF3FC';
  context.fillRect(0, 0, ...coords(1, 1));

  context.beginPath();
  context.fillStyle = 'rgba(232, 228, 109, 0.6)';
  context.moveTo(...coords(midX, midY));
  context.lineTo(coordX(midX - 0.03), 0);
  context.lineTo(coordX(midX + 0.03), 0);
  context.fill();

  context.beginPath();
  context.fillStyle = '#8BE075';
  context.arc(...coords(midX, midY), radius, 0, circle);
  context.fill();

  for (const [treeAngle, size] of treeAngles()) {
    drawTree(radius, treeAngle, size);
  }
  treeCleanup();

  lineSetup();
  for (const lineAngle of lineAngles()) {
    drawLine(radius, lineAngle);
  }
  lineCleanup();
}

window.onresize = () => {
  resized = true;
};

export default draw;
