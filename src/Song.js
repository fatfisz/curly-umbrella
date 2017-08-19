import audioContext from 'audioContext';
import { startBeat, stopBeat } from 'beatStore';

const masterVolume = 0.35;

function getFrequencyFromNoteNumber(note) {
  const magic = 16 * 4;
  const period = 10 * 12 * magic - note * magic;
  return 8363 * Math.pow(2, (6 * 12 * magic - period) / (12 * magic));
}

class SampleWrapper {
  constructor(sample) {
    this.data = sample.rawData;
  }

  init() {
    this.position = 0;
    this.playbackRate = 0;
  }
}

export default class Song {
  constructor({ bpm, channels, startAt = 0, loopAt = 0 }) {
    const firstChannel = channels[0];
    const notesPerPattern = firstChannel.notes.length;
    const patternsPerChannel = firstChannel.patterns.length;

    for (let index = 0; index < channels.length; ++index) {
      const channel = channels[index];
      channel.sample = new SampleWrapper(channel.sample);

      if (false) {
        if (channel.notes.length !== notesPerPattern) {
          throw new Error(`Inconsistent channel length: channel ${index} has ${channel.notes.length} notes, expected ${notesPerPattern}`);
        }

        if (channel.patterns.length !== patternsPerChannel) {
          throw new Error(`Inconsistent pattern number: channel ${index} has ${channel.patterns.length} patterns, expected ${patternsPerChannel}`);
        }
      }
    }

    this.bpm = bpm;
    this.channels = channels;
    this.startAt = startAt;
    this.loopAt = loopAt;
    this.notesPerPattern = notesPerPattern;
    this.patternsPerChannel = patternsPerChannel;
    this.samplesPerNote = Math.round(audioContext.sampleRate * 60 / (bpm * 4));
    this.sampleRatio = 44100 / audioContext.sampleRate;
    this.bufferPosition = 0;
    this.currentPattern = this.startAt;
    this.currentNote = 0;
    for (const { sample } of this.channels) {
      sample.init();
    }
    this.prepareAudioBuffer();
  }

  prepareAudioBuffer() {
    this.audioBuffer = audioContext.createBuffer(
      1,
      this.notesPerPattern * this.patternsPerChannel * this.samplesPerNote,
      audioContext.sampleRate,
    );

    const buffer = this.audioBuffer.getChannelData(0);
    buffer.fill(0);

    for (let i = 0; i < buffer.length; ++i) {
      if (this.bufferPosition % this.samplesPerNote === 0) {

        for (const { notes, patterns, sample } of this.channels) {
          if (!patterns[this.currentPattern]) {
            continue;
          }

          const note = notes[this.currentNote];

          if (typeof note === 'undefined') {
            continue;
          }

          if (note === 0) {
            sample.playbackRate = 0;
            continue;
          }

          sample.position = 0;
          sample.playbackRate = getFrequencyFromNoteNumber(note) / getFrequencyFromNoteNumber(49) * this.sampleRatio;
        }

        this.currentNote++;

        if (this.currentNote === this.notesPerPattern) {
          this.currentNote = 0;
          this.currentPattern += 1;
          if (this.currentPattern === this.patternsPerChannel) {
            this.currentPattern = this.loopAt;
          }
        }
      }

      let value = 0;

      for (const { sample } of this.channels) {
        if (sample.playbackRate !== 0) {
          value += sample.data[Math.floor(sample.position)];
          sample.position += sample.playbackRate;
          if (sample.position >= sample.data.length) {
            sample.playbackRate = 0;
          }
        }
      }

      buffer[i] = value * masterVolume;
      this.bufferPosition += 1;
    }
  }

  start() {
    const source = audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(audioContext.destination);
    source.loop = true;
    source.loopStart = this.loopAt * this.notesPerPattern * 60 / (4 * this.bpm);
    source.loopEnd = source.buffer.duration;
    source.start(startBeat(this.bpm));
    this.source = source;
    return this;
  }

  stop() {
    stopBeat();
    this.source.disconnect();
    this.source = null;
  }
}
