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

window.onkeydown = ({ which }) => {
  switch (which) {
    case 32:
      togglePlay();
      break;

    case 67:
    case 88: // c or x
      if (addTree()) {
        samples.key1.play();
      }
      break;

    case 86:
    case 90: // v or z
      if (addTree()) {
        samples.key2.play();
      }
      break;
  }
};
