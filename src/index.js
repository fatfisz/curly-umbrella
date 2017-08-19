import initCanvas from 'canvas';
import * as samples from 'Samples';
import * as songs from 'Songs';

let playing = false;

function togglePlay() {
  if (playing) {
    songs.level1.stop();
  } else {
    songs.level1.play();
  }

  playing = !playing;
}

document.getElementById('canvas').onclick = togglePlay;

initCanvas();

window.onkeydown = ({ which }) => {
  if (which == 67 || which == 88) { // c or x
    samples.key1.play();
  }

  if (which == 86 || which == 90) { // v or z
    samples.key2.play();
  }
};
