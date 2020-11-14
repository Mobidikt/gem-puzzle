import { audio } from './constants.js'

export function playSound(){
  audio.currentTime = 0;
  audio.play();
}
