'use strict';

export default class Popup {
  constructor() {
    this.pop_up = document.querySelector('.pop-up');
    this.msg = document.querySelector('.pop-up__msg');
    this.btn_replay = document.querySelector('.replay');
    
    this.btn_replay.addEventListener('click', () => {
      this.hidePopupScreen();
      this.onClick && this.onClick();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
  
  showPopupScreen(msg) {
    // switch (msg) {
    //   case 'win':
    //     this.msg.textContent = 'You Won ! 🥳';
    //     break;
    //   case 'lose':
    //     this.msg.textContent = `You lose ~ 😭`;
    //     break;
    //   case 'replay':
    //     this.msg.textContent = `Replay ? 😊`;
    //     break;
        
    //   default:
    //     throw new Error('not valid result');
    // } 
    this.msg.textContent = msg;
    this.pop_up.classList.remove('hide');
  }
  
  hidePopupScreen() {
    this.pop_up.classList.add('hide');
  }
}