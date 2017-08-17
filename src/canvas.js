import audioContext from 'audioContext';
import { beatAnimation } from 'beatStore';
import svgImage from 'svgImage';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const circle = Math.PI * 2;
const ratio = 3 / 2;
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 56">
    <path fill="none" stroke-width="2" stroke="#000" d="M15.5 50.5v5h10v-5m-5-50l20 50H.5z" opacity=".3" stroke-linejoin="round" stroke-dasharray="4 1.5"/>
  </svg>
`);

const midX = 0.2;
const midY = 6;
const baseRadius = 5.2;

function drawTree(radius, angle) {
  const width = tree.width * radius / 5;
  const height = tree.height * radius / 5;
  context.restore();
  context.save();
  context.translate(coordX(midX), coordY(midY));
  context.rotate(angle);
  context.drawImage(tree, -width / 2, -coordY(radius) - height, width, height);
}

function draw(now = 0) {
  requestAnimationFrame(draw);
  if (resized) {
    resized = false;
    setSizeFromWindow();
  }

  const offset = now / 20000;

  const radius = baseRadius + beatAnimation() / 100;

  context.restore();
  context.save();
  context.fillStyle = '#BBF3FC';
  context.fillRect(0, 0, ...coords(1, 1));

  context.beginPath();
  context.fillStyle = '#8BE075';
  context.arc(...coords(midX, midY), coordY(radius), 0, circle);
  context.fill();

  const number = 128;
  for (let i = 0; i < number; ++i) {
    drawTree(radius, -offset + circle * i / number);
  }
}

window.onresize = () => {
  resized = true;
};

export default draw;
