import initCanvas from 'canvas';
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
