import audioContext from 'audioContext';
import { circle } from 'consts';
import context, { canvas } from 'context';
import drawText from 'drawText';
import { beatValue, distances, lineAngles, treeAngles, treeOutlineAngles } from 'store';
import svgImage from 'svgImage';

const ratio = 16 / 9;

const midX = 0.2;
const midY = 10;
const baseRadius = 9.2;

const distanceBarWidth = 0.2;
const distanceBarHeight = 0.04;
const distanceBarMargin = 0.06;
const visibleDistances = 20;

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

const strokeStyle = `
  stroke-linejoin="round"
  stroke-width="2"
`;

const treeOutline = svgImage(`
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
    <path
      d="M15.5 44v5h10v-5m-5-43L39 44H1z"
      fill="none"
      stroke="rgba(0, 0, 0, 0.3)"
      stroke-dasharray="4 1.5"
      ${strokeStyle}
    />
  </svg>
`);

const tree = svgImage(`
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
    <path d="M15.5 44v5h10v-5" fill="#ba8659" stroke="#ba8659" ${strokeStyle} />
    <path d="M20.5 1L39 44H1z" fill="#64a154" stroke="#64a154" ${strokeStyle} />
  </svg>
`);

function sizeMultiplier() {
  return coordY(baseRadius) / 4000;
}

function drawTree(image, radius, angle, size = 1) {
  const multiplier = sizeMultiplier() * size;
  const width = image.width * multiplier;
  const height = image.height * multiplier;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  context.setTransform(cos, sin, -sin, cos, ...coords(midX, midY));
  context.drawImage(image, -width / 2, -radius - height, width, height);
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

function drawInfoBackground() {
  context.fillStyle = 'rgba(0, 0, 0, 0.6)';
  context.fillRect(...coords(0, 1 - distanceBarMargin * 2 - distanceBarHeight), ...coords(1, 1));
}

function drawDistanceBar() {
  context.fillStyle = '#5A8FE8';
  context.fillRect(
    ...coords(0.5 - distanceBarWidth / 2, 1 - distanceBarMargin - distanceBarHeight),
    ...coords(distanceBarWidth, distanceBarHeight),
  );

  context.fillStyle = '#6EE86D';
  context.fillRect(
    ...coords(0.5 - distanceBarWidth / 4, 1 - distanceBarMargin - distanceBarHeight),
    ...coords(distanceBarWidth / 2, distanceBarHeight),
  );

  context.lineWidth = sizeMultiplier() * 1;

  distances.slice(-visibleDistances).forEach((distance, index, { length }) => {
    context.beginPath();
    const alpha = (index + 1 + visibleDistances - length) / visibleDistances;
    context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    const x = coordX(0.5 + distanceBarWidth / 2 * distance);
    context.moveTo(x, coordY(1 - distanceBarMargin - distanceBarHeight));
    context.lineTo(x, coordY(1 - distanceBarMargin));
    context.stroke();
  });
}

function drawScore() {
  drawText(
    coordY(distanceBarHeight),
    `score: 9876543210`,
    ...coords(distanceBarMargin, 1 - distanceBarMargin - distanceBarHeight),
    '#fff',
  );
}

function drawInfo() {
  drawInfoBackground();
  drawDistanceBar();
  drawScore();
}

function draw(now) {
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

  lineSetup();
  for (const lineAngle of lineAngles()) {
    drawLine(radius, lineAngle);
  }
  lineCleanup();

  for (const [treeOutlineAngle, size] of treeOutlineAngles()) {
    drawTree(treeOutline, radius, treeOutlineAngle, size);
  }
  for (const treeAngle of treeAngles()) {
    drawTree(tree, radius, treeAngle);
  }
  treeCleanup();

  drawInfo();
}

window.onresize = () => {
  resized = true;
};

requestAnimationFrame(draw);
