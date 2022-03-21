'use strict';

export default class Timer {
  constructor(timeLeft) {
    this.gameTimer = document.querySelector(".game__timer");
    this.timer = undefined;
    this.timeLeft = timeLeft;
  }

  setTimeOutListener(timeout) {
    this.timeout = timeout;
  }

  countTime() {
    this.updateTimerText(this.timeLeft);
    if (this.timeLeft > 0) {
      --this.timeLeft;
      console.log(this.timeLeft);
      this.updateTimerText(this.timeLeft);

    } else {
      this.stopTime();
      this.timeout();

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
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

}