'use strict';
import Popup from "./popup.js";
import GameBuilder from "./game.js"

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

// const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
const game = new GameBuilder()
  .setgameDuration(GAME_DURATION_SEC)  //return GameBuilder
  .setcarrotCount(CARROT_COUNT)        //return GameBuilder
  .setbugCount(BUG_COUNT)              //return GameBuilder
  .build();                         //return Game

const popup = new Popup();
game.setGameStopListener((result) => {
  popup.showPopupScreen(result);
});

popup.setClickListener(() => {
  game.start();
});
