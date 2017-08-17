import audioContext from 'audioContext';

let expectedDiff = null;
let lastTime = null;
let ticks = 0;

export function emitInit(bpm) {
  expectedDiff = 60 / bpm / 4;
  lastTime = audioContext.currentTime;
  ticks = 0;
}

export function emitTick() {
  if (ticks % 4 === 3) {
    lastTime = audioContext.currentTime + expectedDiff;
  }
  ticks += 1;
}

export function beatAnimation() {
  if (lastTime === null) {
    return null;
  }
  const result = 1 - Math.abs((lastTime - audioContext.currentTime) / expectedDiff);
  return Math.max(Math.min(result, 1), 0) ** 2;
}
