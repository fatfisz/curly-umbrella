import 'canvas';
import * as samples from 'Samples';
import * as songs from 'Songs';
import { addTree } from 'store';

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

window.onkeydown = ({ which }) => {
  if (which == 67 || which == 88) { // c or x
    if (addTree()) {
      samples.key1.play();
    }
  }

  if (which == 86 || which == 90) { // v or z
    if (addTree()) {
      samples.key2.play();
    }
  }
};
