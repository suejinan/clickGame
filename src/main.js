'use strict';
import Popup from "./popup.js";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

const bug = {type:"bug", img:"img/bug.png", sound:"bug_pull.mp3"};
const carrot = {type:"carrot", img:"img/carrot.png",sound:"carrot_pull.mp3"};

const btn_play = document.querySelector('.game__button');

const field = document.querySelector('.game__field');
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

class Field {
  constructor(field) {
    this.field = field;
    this.fieldRec = field.getBoundingClientRect();

    this.width = this.fieldRec.width;
    this.height = this.fieldRec.height;
    this.minX = this.fieldRec.left;
    this.minY = this.fieldRec.top;

    this.field.addEventListener('click', (event) => {
      this.onClickItem(event)
    });

  }

  setItems(itemType, itemNum) {
    for (let i=0; i<itemNum; i++) {
      const newItem = this.createItem(itemType);
      this.field.appendChild(newItem);
    }
  }

  initField() {
    this.setItems(bug, BUG_COUNT);
    this.setItems(carrot, CARROT_COUNT);
  }

  createItem(type) {
    const item = document.createElement('img');
    item.setAttribute('class', `item`);
    item.setAttribute('src', `${type.img}`);
    item.setAttribute('data-type', `${type.type}`);
    this.getRandomCoord(item);

    return item
  }

  getRandomCoord(item) {
    const randomX = Math.random()*(this.width-CARROT_SIZE);
    const randomY = Math.random()*(this.height-CARROT_SIZE);

    // item hover시 transform 적용하기 위해
    //item.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
    item.style.left = `${randomX}px`;
    item.style.top = `${randomY}px`;
  }
  
  onClickItem(event) {
    if (!gameStarted) {
      return;
    }
    const target = event.target;

    if (target.dataset.type === 'carrot') {
      music.playMusic(music.carrotPull);
      target.remove();
      countNum--;
      this.updateCountBoard();
      if (countNum === 0) {
        finishGame("win");
      }
      
    } else if (target.dataset.type === 'bug') {
      timer.stopTime();
      finishGame("lose");
    }
  }

  updateCountBoard() {
    gameCounter.innerText = countNum;
  }
}

class Music {
  constructor() {
    this.bgMusic = new Audio('sound/bg.mp3');
    this.bugPull = new Audio('sound/bug_pull.mp3');
    this.carrotPull = new Audio('sound/carrot_pull.mp3');
    this.winMusic = new Audio('sound/game_win.mp3');
    this.alertMusic = new Audio('sound/alert.wav');
  }

  playMusic(audio) {
    audio.currentTime = 0;
    audio.play();
  }

  stopMusic(audio) {
    audio.pause();
  }

}

const timer = new Timer(gameTimer);
const play_section = new Field(field);
const pop_up = new Popup();
const music = new Music();

pop_up.setClickListener(startGame);

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
  music.playMusic(music.bgMusic);
}

function stopGame() {
  gameStarted = false;
  timer.stopTime();
  hideGameButton();
  pop_up.showPopupScreen("replay");
  music.stopMusic(music.bgMusic);
  music.playMusic(music.alertMusic);
}

function finishGame(result) {
  gameStarted  = false;
  timer.stopTime();
  hideGameButton();
  pop_up.showPopupScreen(result);
  if (result === "win") {
    music.playMusic(music.winMusic);
  } else {
    music.playMusic(music.bugPull);
  }
  music.stopMusic(music.bgMusic);
  music.playMusic(music.alertMusic);
}

function initGame() {
  field.innerHTML = '';
  countNum = CARROT_COUNT;
  timeLeft = GAME_DURATION_SEC;
  gameCounter.innerText = CARROT_COUNT;
  timer.updateTimerText(timeLeft);
  play_section.initField();
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