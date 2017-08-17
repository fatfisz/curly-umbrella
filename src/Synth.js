/**
 * Modified from: https://github.com/gheja/glitch13k/blob/master/src/synth.js
 */

import audioContext from 'audioContext';
import jsfxr from 'jsfxr';
import songs from 'songs';

function getFrequencyFromNoteNumber(note) {
  const magic = 16 * 4;
  const period = 10 * 12 * magic - note * magic;
  return 8363 * Math.pow(2, (6 * 12 * magic - period) / (12 * magic));
}

function SynthChannel() {
  this.data = null;
  this.position = 0;
  this.playbackRate = 0;
}

export default class Synth {
  constructor() {
    this.currentSong = null;
  }

  playSong(id) {
    const song = songs[id];

    if (this.currentSong === song) {
      return;
    }
    this.currentSong = song.start();
  }

  stop() {
    this.currentSong.stop();
    this.currentSong = null;
  }
}
