'use strict';

const chosenParanetrs = {
  language: 'eng',
  hearts: 3,
  score: 30,
  toString(){
    return `{language: "${this.language}", hearts: ${this.hearts}, score: ${this.score}}`;
  }
}



function redirectToGameLobby(){
  window.location.href = '/gameLobby';
}