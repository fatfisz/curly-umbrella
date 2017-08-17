import audioContext from 'audioContext';

export function emitInit(bpm) {
  const expectedDiff = 60 / bpm / 4;
}

let lastTime = null;

export function emitBeat() {
  lastTime = audioContext.currentTime;
}
