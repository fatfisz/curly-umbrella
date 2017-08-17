/**
 * Modified from the gist: https://gist.github.com/methodin/1553779
 */

const seed = 42;

const length = 624;
const offset = 397;
const multiplier = 0x6c078965;
const upper = 0x80000000;
const lower = 0x7fffffff;
const magic = 0x9908b0df;

const state = [seed];

for (let index = 1; index < length; index++) {
  const next = state[index - 1] ^ (state[index - 1] >>> 30);
  state[index] = ((((next & 0xffff0000) >>> 16) * multiplier) << 16) + (next & 0x0000ffff) * multiplier + index;
  state[index] >>>= 0;
}

function generateNumbers() {
  for (let index = 0; index < length - 1; index++) {
    const y = (state[index] & upper) | (state[(index + 1) % length] & lower);
    state[index] = state[(index + offset) % length] ^ (y >>> 1);
    if (y % 2 !== 0) {
      state[index] ^= magic;
    }
  }
}

let index = 0;

export default function random() {
  if (index === 0) {
    generateNumbers();
  }

  let y = state[index];
  y ^= y >>> 11;
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= y >>> 18;

  index = (index + 1) % length;

  return (y >>> 0) / 4294967296;
}
