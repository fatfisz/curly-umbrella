import audioContext from 'audioContext';

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
    this.samplesPerBar = Math.round(audioContext.sampleRate * 60 / (bpm * 4));
    this.sampleRatio = 44100 / audioContext.sampleRate;
  }

  init() {
    this.bufferPosition = 0;
    this.currentPattern = this.startAt;
    this.currentBar = 0;
    for (const { sample } of this.channels) {
      sample.init();
    }

    return this;
  }
}
