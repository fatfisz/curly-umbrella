import audioContext from 'audioContext';
import jsfxr from 'jsfxr';

export default class Sample {
  constructor(data) {
    const { buffer, rawData } = jsfxr(audioContext, data);
    this.buffer = buffer;
    this.rawData = rawData;
  }
}
