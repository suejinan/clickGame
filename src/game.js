'use strict';

import Field from "./field.js";
import Timer from "./timer.js";
import * as sound from "./sound.js";

// Builder Pattern
export default class GameBuilder {
  setgameDuration(duration) {
    this.gameDuration = duration;
    return this;  // Class를 리턴
  }

  setcarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  setbugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, 
      this.carrotCount, 
      this.bugCount
    )
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.timeLeft = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameCounter = document.querySelector('.game__counter');
    this.btnPlay = document.querySelector('.game__button');
    this.btnPlay.addEventListener('click', () => {
      if (!this.gameStarted) {
        this.start();
      } else {
        this.stop();
      }
      console.log(this.gameStarted);
    });
    
    this.gameStarted = false;
    this.countNum = 0;
    
    this.timer = undefined;
    this.playSection = new Field(carrotCount, bugCount);
    this.playSection.setClickListener(this.onItemClick);
  }
  
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  
  start() {
    this.timer = new Timer(this.timeLeft);
    this.timer.setTimeOutListener(() => {
      this.finish('lose')
    });
    this.gameStarted = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.timer.startTime();
    sound.playBg();
  }
  
  stop() {
    this.gameStarted = false;
    this.timer.stopTime();
    this.hideGameButton();
    sound.stopBg();
    sound.playAlert();
    this.onGameStop && this.onGameStop('replay');
  }

  init() {
    this.countNum = this.carrotCount;
    this.updateCountBoard();
    this.timer.updateTimerText(this.timeLeft);
    this.playSection.init();
  }

  finish(result) {
    this.gameStarted  = false;
    this.timer.stopTime();
    this.hideGameButton();
    if (result === "win") {
      sound.playWin();
    } else {
      sound.playBug();
    }
    sound.stopBg();
    sound.playAlert();
    this.onGameStop && this.onGameStop(result);
  
  }

  showStopButton() {
    this.btnPlay.style.visibility = "visible";
    const icon =  this.btnPlay.firstElementChild;
    icon.classList.replace('fa-play','fa-stop');
  }
  
  hideGameButton() {
    this.btnPlay.style.visibility = "hidden";
  }
  
  showTimerAndScore() {
    this.timer.gameTimer.style.visibility = 'visible';
    this.gameCounter.style.visibility = 'visible';
  }
  
  updateCountBoard() {
    this.gameCounter.innerText = this.countNum;
  }

  onItemClick = (type) => {
    console.log("clicked!");
    if (!this.gameStarted) {
      return false;
    }
  
    if (type === 'carrot') {
      sound.playCarrot();
      this.countNum--;
      this.updateCountBoard();
      if (this.countNum === 0) {
        this.finish("win");
      }
      
    } else if (type === 'bug') {
      sound.playBug();
      this.timer.stopTime();
      this.finish("lose");
    }
    
    return true;
  }
}