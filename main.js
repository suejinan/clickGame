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
    this.pop_up = document.querySelector('.pop-up');
    this.msg = document.querySelector('.pop-up__msg');
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
    music.stopMusic(music.bgMusic);
    music.playMusic(music.alertMusic);
  }
  
  hidePopupScreen() {
    this.pop_up.classList.add('hide');
    btn_play.style.visibility = "visible";
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

    this.field.addEventListener('click', (event) =>  {
      this.clickItem(event);
    });

  }

  setItems(itemType, itemNum) {
    for(let i=0; i<itemNum; i++) {
      const newItem = this.createItem(itemType);
      this.field.appendChild(newItem);
    }
  }

  initField() {
    this.field.innerHTML = '';
    countNum = 10;
    counter.innerText = '10';
    this.setItems(bug, 7);
    this.setItems(carrot, 10);
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
    const randomX = Math.random()*(this.width-item.width) + this.minX-item.width;
    const randomY = Math.random()*(this.height-item.height) + this.minY-item.height;

    item.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
  }
  
  clickItem(event) {
    const target = event.target;

    if(target.dataset.type === 'carrot') {
      music.playMusic(music.carrotPull);
      target.remove();
      countNum--;
      counter.innerText = countNum;
      if(countNum === 0) {
        pop_up.showPopupScreen("win");
        music.playMusic(music.winMusic);
        
      }
      
    } else {
      music.playMusic(music.bugPull);
      stopGame("lose");
    }
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
    audio.play();
  }

  stopMusic(audio) {
    audio.pause();
  }

}

function startGame() {
  pop_up.hidePopupScreen();
  play_section.initField();
  timer.startTime();
  console.log("--------- start ---------");
  gameStarted = true;
  music.playMusic(music.bgMusic);
  btn_play.innerHTML=`<i class="fa-solid fa-square"></i>`;
}

function stopGame(result) {
  timer.resetTime();
  gameStarted = false;
  music.stopMusic(music.bgMusic);
  pop_up.showPopupScreen(result);
  console.log("--------- stop ---------");
}

const bug = {type:"bug", img:"img/bug.png", sound:"bug_pull.mp3"};
const carrot = {type:"carrot", img:"img/carrot.png",sound:"carrot_pull.mp3"};

let gameStarted = false;
const btn_play = document.querySelector('.game__button');
btn_play.innerHTML=`<i class="fa-solid fa-play"></i>`;

const field = document.querySelector('.game__field');
const counter = document.querySelector('.game__counter');
let countNum = 10;

const time_text = document.querySelector(".game__timer");
const timer = new Timer(time_text);
const play_section = new Field(field);
const pop_up = new Popup();
const music = new Music();

btn_play.addEventListener('click', () => {
  if (!gameStarted) {
    startGame();
  } else {
    stopGame('replay');
  }

});