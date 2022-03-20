'use strict';
import Popup from "./popup.js";
import Game from "./game.js"

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 5;

const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
const popup = new Popup();
game.setGameStopListener((result) => {
  popup.showPopupScreen(result);
});

popup.setClickListener(() => {
  game.start();
});
