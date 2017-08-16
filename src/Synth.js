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
    this.songVolume = 0.35;
    this.currentSong = null;
    this.synthChannels = [];

    // initialize 24 channels for music
    for (let i = 0; i < 24; ++i) {
      this.synthChannels[i] = new SynthChannel();
    }

    const music = audioContext.createScriptProcessor(2 ** 10, 0, 1);
    music.onaudioprocess = this.fillAudioNodeBuffer.bind(this);
    music.connect(audioContext.destination);
  }

  fillAudioNodeBuffer(event) {
    const buffer = event.outputBuffer.getChannelData(0);
    buffer.fill(0);

    if (!this.currentSong) {
      return;
    }

    const song = this.currentSong;

    for (let i = 0; i < buffer.length; ++i) {
      if (song.bufferPosition % song.samplesPerBar === 0) {
        for (const { notes, patterns, sample } of song.channels) {
          if (!patterns[song.currentPattern]) {
            continue;
          }

          const note = notes[song.currentBar];

          if (typeof note === 'undefined') {
            continue;
          }

          if (note === 0) {
            sample.playbackRate = 0;
            continue;
          }

          sample.position = 0;
          sample.playbackRate = getFrequencyFromNoteNumber(note) / getFrequencyFromNoteNumber(49) * song.sampleRatio;
        }

        song.currentBar++;

        if (song.currentBar === song.notesPerPattern) {
          song.currentBar = 0;
          song.currentPattern += 1;
          if (song.currentPattern === song.patternsPerChannel) {
            song.currentPattern = song.loopAt;
          }
        }
      }

      let value = 0;

      for (const { sample } of song.channels) {
        if (sample.playbackRate !== 0) {
          value += sample.data[Math.floor(sample.position)];
          sample.position += sample.playbackRate;
          if (sample.position >= sample.data.length) {
            sample.playbackRate = 0;
          }
        }
      }

      buffer[i] = value * this.songVolume;
      song.bufferPosition += 1;
    }
  }

  playSong(id) {
    const song = songs[id];

    if (this.currentSong === song) {
      return;
    }
    this.currentSong = song.init(this.synthChannels);
  }

  stop() {
    this.currentSong = null;
  }
}
