import { hihat, kick, saw, snare, square, squareLead } from 'samples';
import Song from 'Song';

// Notes (it's more convenient _not_ to import them...)
const C3 = 37;
const D3 = 39;
const E3 = 41;
const F3 = 42;
const G3 = 44;
const A3 = 46;
const H3 = 48;
const C4 = 49;
const D4 = 51;
const E4 = 53;
const F4 = 54;
const G4 = 56;
const A4 = 58;
const H4 = 60;
const C5 = 61;
const D5 = 63;
const E5 = 65;
const F5 = 66;
const G5 = 68;
const A5 = 70;
const H5 = 72;
const C6 = 73;

export const level1 = new Song({
  bpm: 133,
  channels: [
    { sample: kick,       patterns: [1,1,1,1,1,1,1,1], notes: [C5,,,,C5,,,,C5,,,,C5,,,,C5,,,,C5,,,,C5,,,,C5,,,,] },
    { sample: hihat,      patterns: [1,1,1,1,1,1,1,1], notes: [,,C5,,,,C5,C5,,,C5,,,,C5,C5,,,C5,,,,C5,C5,,,C5,,,,C5,C5] },
    { sample: snare,      patterns: [1,1,1,1,1,1,1,1], notes: [,,,,C5,,,,,,,,C5,,,,,,,,C5,,,,,,,,C5] },
    { sample: snare,      patterns: [ ,1, , , , , , ], notes: [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,C5,C5,C5] },
    { sample: snare,      patterns: [ , , ,1, ,1, ,1], notes: [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,E5] },

    { sample: square,     patterns: [ , ,1,1,1,1, , ], notes: [0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,F3,F3,0,,F3,F3,0,,F3,F3,0,,F3,F3] },
    { sample: square,     patterns: [ , ,1,1,1,1, , ], notes: [0,,D4,D4,0,,D4,D4,0,,D4,D4,0,,D4,D4,0,,C4,C4,0,,C4,C4,0,,C4,C4,0,,C4,C4] },
    { sample: square,     patterns: [ , , , , , ,1, ], notes: [0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,G3,G3] },
    { sample: square,     patterns: [ , , , , , ,1, ], notes: [0,,C4,C4,0,,C4,C4,0,,C4,C4,0,,C4,C4,0,,D4,D4,0,,D4,D4,0,,D4,D4,0,,D4,D4] },
    { sample: square,     patterns: [ , , , , , , ,1], notes: [0,,F3,F3,0,,F3,F3,0,,F3,F3,0,,F3,F3,0,,G3,G3,0,,G3,G3,0,,G3,G3,0,,G3,G3] },
    { sample: square,     patterns: [ , , , , , , ,1], notes: [0,,C4,C4,0,,C4,C4,0,,C4,C4,0,,C4,C4,0,,D4,D4,0,,D4,D4,0,,D4,D4,0,,D4,D4] },

    { sample: squareLead, patterns: [ , ,1, ,1, , , ], notes: [G5,,,,D5,,,,,,D5,,,,G5,,F5,,E5,,F5,,D5,,,,D5,,C5] },
    { sample: squareLead, patterns: [ , , ,1, ,1, , ], notes: [H4,,,,G4,,,,,,G4,,H4,,G4,,F4,,C5,,D5,,E5,,,,E5,,D5] },
    { sample: squareLead, patterns: [ , , , , ,1, , ], notes: [,C5,H4,0] },
    { sample: squareLead, patterns: [ , , , , , ,1, ], notes: [C5,,,,G5,,E5,,,,C5,,,,C5,,G4,,D5,,C5,,H4,,,,G4,,A4,,H4] },
    { sample: squareLead, patterns: [ , , , , , , ,1], notes: [F5,,F4,,E5,,F4,,D5,,F4,,C5,,F4,,H4,,C5,,D5,,G4] },

    { sample: saw,        patterns: [ , ,1,1,1,1, , ], notes: [
      G3, H3, D4, G4, D4, G4, H4, D5, H4, G4, H4, G4, D4, G4, D4, H3,
      F3, H3, D4, F4, D4, F4, H4, D5, H4, F4, H4, F4, D4, F4, D4, H3,
    ] },
    { sample: saw,        patterns: [ , , , , , ,1, ], notes: [
      E3, G3, C4, E4, C4, E4, G4, C5, G4, E4, G4, E4, C4, E4, C4, G3,
      G3, H3, D4, G4, D4, G4, H4, D5, H4, G4, H4, G4, D4, G4, D4, H3,
    ] },
    { sample: saw,        patterns: [ , , , , , , ,1], notes: [
      F3, A3, C4, F4, C4, F4, A4, C5, A4, F4, A4, F4, C4, F4, C4, A3,
      G3, H3, D4, G4, D4, G4, H4, D5, H4, G4, H4, G4, D4, G4, D4, H3,
    ] },
  ],
  loopAt: 2,
});
