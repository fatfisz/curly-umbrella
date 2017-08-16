import Synth from 'Synth';

const synth = new Synth();
let playing = false;

function togglePlay() {
  if (playing) {
    synth.stop();
  } else {
    synth.playSong('level1');
  }

  playing = !playing;
}

document.getElementById('playback').onclick = togglePlay;
togglePlay();
