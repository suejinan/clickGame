'use strict';

class Timer {
  constructor(text) {
    this.time = 10;
    this.text = text;
    this.interval;
  }

  countTime() {
    this.time--;
    if (this.time > 0) {
      console.log(this.time);
      this.text.innerText = `00:0${this.time}`;
    } else {
      stopGame('lose');
    }
  }

  startTime() {
    this.time = 10;
    this.text.innerText = '00:10';
    this.interval = setInterval(() => {
      this.countTime();
    }, 1000);
  }
  
  resetTime() {
    console.log('reset');
    clearInterval(this.interval);
  }
}

class Popup {
  constructor() {
    this.pop_up = document.querySelector('.result_popup');
    this.msg = document.querySelector('.result_msg');
    this.btn_replay = document.querySelector('.replay');
    
    this.btn_replay.addEventListener('click', () => {
      startGame();
    });
  }
  
  showPopupScreen(msg) {
    switch (msg) {
      case 'win':
        this.msg.textContent = 'You Won ! 🥳';
        break;
      case 'lose':
        this.msg.textContent = `You lose ~ 😭`;
        break;
      case 'replay':
        this.msg.textContent = `Replay ? 😊`;
        break;
        
      default:
        break;
    } 

    btn_play.style.visibility = "hidden";
    this.pop_up.classList.remove('hide');
  }
  
  hidePopupScreen() {
    this.pop_up.classList.add('hide');
    btn_play.style.visibility = "visible";
  }
}

function startGame() {
  pop_up.hidePopupScreen();
  timer.startTime();
  console.log("--------- start ---------");
  gameStarted = true;
  btn_play.innerHTML=`<i class="fa-solid fa-square"></i>`;
}

function stopGame(result) {
  timer.resetTime();
  gameStarted = false;
  pop_up.showPopupScreen(result);
  console.log("--------- stop ---------");
}

let gameStarted = false;
const btn_play = document.querySelector('.play_stop');
btn_play.innerHTML=`<i class="fa-solid fa-play"></i>`;

const time_text = document.querySelector(".time");
const timer = new Timer(time_text);
const pop_up = new Popup();

btn_play.addEventListener('click', () => {
  if (!gameStarted) {
    startGame();
  } else {
    stopGame('replay');
  }

});