'use strict';

const bgMusic = new Audio('sound/bg.mp3');
const bugPull = new Audio('sound/bug_pull.mp3');
const carrotPull = new Audio('sound/carrot_pull.mp3');
const winMusic = new Audio('sound/game_win.mp3');
const alertMusic = new Audio('sound/alert.wav');

export function playCarrot() {
  playMusic(carrotPull);
}

export function playBug() {
  playMusic(bugPull);
}

export function playWin() {
  playMusic(winMusic);
}

export function playAlert() {
  playMusic(alertMusic);
}

export function playBg() {
  playMusic(bgMusic);
}

export function stopBg() {
  stopMusic(bgMusic);
}

function playMusic(audio) {
  audio.currentTime = 0;
  audio.play();
}

function stopMusic(audio) {
  audio.pause();
}