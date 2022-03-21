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
    this.msg.textContent = msg;
    this.pop_up.classList.remove('hide');
  }
  
  hidePopupScreen() {
    this.pop_up.classList.add('hide');
  }
}