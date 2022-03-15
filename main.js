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

class Field {
  constructor(field) {
    this.field = field;
    this.fieldRec = field.getBoundingClientRect();

    this.width = this.fieldRec.width;
    this.height = this.fieldRec.height;
    this.minX = this.fieldRec.left;
    this.minY = this.fieldRec.top;
    console.log(this.fieldRec);
  }

  setItems(itemType, itemNum) {
    console.log(`setItems ${itemType}, ${itemNum}`);
    for(let i=0; i<itemNum; i++) {
      const newItem = this.createItem(itemType, i);
      this.field.appendChild(newItem);
    }
  }

  initField() {
    this.field.innerHTML = '';
    this.setItems(bug, 7);
    this.setItems(carrot, 10);
  }

  createItem(type, id) {
    const item = document.createElement('img');
    item.setAttribute('class', `item`);
    item.setAttribute('src', `${type.img}`);
    item.setAttribute('data-id', `${id}`);
    this.getRandomCoord(item);

    return item
  }

  getRandomCoord(item) {
    const randomX = Math.random()*(this.width-item.width) + this.minX-item.width;
    const randomY = Math.random()*(this.height-item.height) + this.minY-item.height;

    item.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
  }
  
}

function startGame() {
  pop_up.hidePopupScreen();
  play_section.initField();
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

const bug = {type:"bug", img:"img/bug.png", sound:"bug_pull.mp3"};
const carrot = {type:"carrot", img:"img/carrot.png",sound:"carrot_pull.mp3"};

let gameStarted = false;
const btn_play = document.querySelector('.play_stop');
btn_play.innerHTML=`<i class="fa-solid fa-play"></i>`;

const field = document.querySelector('.field');

const time_text = document.querySelector(".time");
const timer = new Timer(time_text);
const play_section = new Field(field);
const pop_up = new Popup();

btn_play.addEventListener('click', () => {
  if (!gameStarted) {
    startGame();
  } else {
    stopGame('replay');
  }

});