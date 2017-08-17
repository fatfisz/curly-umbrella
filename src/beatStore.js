import audioContext from 'audioContext';

let startTime = null;
let beatTime = null;
let lastTime = null;
let ticks = 0;

export function startBeat(bpm, timeout) {
  startTime = audioContext.currentTime + timeout;
  beatTime = 60 / bpm;
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
