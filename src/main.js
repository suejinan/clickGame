'use strict';
import Popup from "./popup.js";
import {GameBuilder, Result} from "./game.js"
import * as sound from "./sound.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

const game = new GameBuilder()
  .setgameDuration(GAME_DURATION_SEC)  //return GameBuilder
  .setcarrotCount(CARROT_COUNT)        //return GameBuilder
  .setbugCount(BUG_COUNT)              //return GameBuilder
  .build();                         //return Game

const popup = new Popup();
game.setGameStopListener((result) => {
  let msg;
  switch (result) {
    case Result.win:
      msg = 'You Won ! 🥳';
      sound.playWin();
      break;
    case Result.lose:
      msg = `You lose ~ 😭`;
      sound.playBug();
      break;
    case Result.cancel:
      msg = `Replay ? 😊`;
      sound.playAlert();
      break;
      
    default:
      throw new Error('not valid result');
  } 
  popup.showPopupScreen(msg);
});

popup.setClickListener(() => {
  game.start();
});
