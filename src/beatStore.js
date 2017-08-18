import audioContext from 'audioContext';
import { circle } from 'consts';

const speed = 0.08;
const initialAngle = circle / 16 / speed;
let startTime = null;
let beatTime = null;
let lastTime = null;
let ticks = 0;

export function startBeat(bpm) {
  beatTime = 60 / bpm;
  startTime = audioContext.currentTime + initialAngle;
  return startTime;
}

export function stopBeat() {
  startTime = null;
}

export function beatValue() {
  if (startTime === null) {
    return 0;
  }

  const diff = audioContext.currentTime - startTime;
  if (diff < -beatTime / 2) {
    // Start the animation half a beat before the song starts
    return 0;
  }

  const x = ((diff + beatTime) % beatTime) / beatTime;
  const y = (2 * x - 1) ** 6;
  return Math.max(Math.min(y, 1), 0);
}

const noTrees = [];
const beats = [0, 1, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6.5, 7];

export function treeAngles() {
  if (startTime === null) {
    return noTrees;
  }

  const { currentTime } = audioContext;

  return beats.map(
    position => [
      (startTime + beatTime * position - currentTime) * speed,
      position % 4 === 0 ? 1.5 : 1,
    ],
  );
}

// 8 lines is enough (at most 4 are visible with 400 BPM)
const lines = Array(8).fill();

export function lineAngles() {
  if (startTime === null) {
    return noTrees;
  }

  let first = (startTime - audioContext.currentTime) * speed;
  if (first < 0) {
    // Make sure that the last line is outside the screen and align the lines with the beat
    first %= beatTime * 8 * speed;
  }

  return lines.map(
    (_, index) => first + beatTime * 4 * speed * index,
  );
}
