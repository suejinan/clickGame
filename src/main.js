'use strict';
import Popup from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

const btn_play = document.querySelector('.game__button');

const gameCounter = document.querySelector('.game__counter');
const gameTimer = document.querySelector(".game__timer");

let gameStarted = false;
let countNum = 0;
let timeLeft = GAME_DURATION_SEC;

class Timer {
  constructor(timeContainer) {
    this.timeContainer = timeContainer;
    this.timer = undefined;
  }

  countTime() {
    this.updateTimerText(timeLeft);
    if (timeLeft > 0) {
      --timeLeft;
      console.log(timeLeft);
      this.updateTimerText(timeLeft);

    } else {
      clearInterval(this.timer);
      finishGame('lose');
    }
  }

  startTime() {
    this.timer =  setInterval(() => {
      this.countTime();
    }, 1000);
  }

  stopTime() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timeContainer.innerText = `${minutes}:${seconds}`;
  }
}

const timer = new Timer(gameTimer);
const play_section = new Field(CARROT_COUNT, BUG_COUNT);
const pop_up = new Popup();

pop_up.setClickListener(startGame);
play_section.setClickListener(onItemClick);

btn_play.addEventListener('click', () => {
  if (!gameStarted) {
    startGame();
  } else {
    stopGame();
  }
  console.log(gameStarted);
});

function startGame() {
  gameStarted = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  timer.startTime();
  sound.playBg();
}

function stopGame() {
  gameStarted = false;
  timer.stopTime();
  hideGameButton();
  pop_up.showPopupScreen("replay");
  sound.stopBg();
  sound.playAlert();
}

function finishGame(result) {
  gameStarted  = false;
  timer.stopTime();
  hideGameButton();
  pop_up.showPopupScreen(result);
  if (result === "win") {
    sound.playWin();
  } else {
    sound.playBug();
  }
  sound.stopBg();
  sound.playAlert();

}

function initGame() {
  timeLeft = GAME_DURATION_SEC;
  countNum = CARROT_COUNT;
  gameCounter.innerText = CARROT_COUNT;
  timer.updateTimerText(timeLeft);
  play_section.init();
}

function showStopButton() {
  btn_play.style.visibility = "visible";
  const icon =  btn_play.firstElementChild;
  icon.classList.replace('fa-play','fa-stop');
}

function hideGameButton() {
  btn_play.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameCounter.style.visibility = 'visible';
}

function onItemClick(type) {
  console.log("clicked!");
  if (!gameStarted) {
    return;
  }

  if (type === 'carrot') {
    sound.playCarrot();
    countNum--;
    updateCountBoard();
    if (countNum === 0) {
      finishGame("win");
    }
    
  } else if (type === 'bug') {
    sound.playBug();
    timer.stopTime();
    finishGame("lose");
  }

}

function updateCountBoard() {
  gameCounter.innerText = countNum;
}