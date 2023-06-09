'use strict';

const messageWindow = document.getElementById('messageWindow');
const inputWord = document.getElementById('inputWord');
const endGameBorder = document.getElementById('finalBorder');
const counterValue = document.getElementById('counterValue');
const gameOver = document.querySelector('.game-over');
const timeToCheck = 10000;//Time to input word before it change and count as unfound
const pointTarget = 30; //Number of points, that player have to reach
let timer;

document.addEventListener('DOMContentLoaded', initialFunction);
inputWord.addEventListener('keydown', handleEnterKey);

function handleEnterKey(e) {
  if (e.key === 'Enter') {
    sendWordToCheck();
  }
}

function initialFunction(){
  wordReq();
  startTimer();
  gameLobbyParameters.getParametersFromServer();
}

function reloadPage() {
  location.reload();
}

function makeGameLobbyParameters(){
  let hearts = 3;
  let score = 30;

  function getParameters(){
    return {
      hearts,
      score,
    }
  }

  function setParameters(parameters){
    hearts = parameters.hearts;
    score = parameters.score;
    console.log(hearts + '\n' + score);
  }

  function getParametersFromServer() {
    fetch('/gameParameters')
      .then(response => response.json())
      .then(data => {
        const parameters = data.parameters;
        setParameters(parameters);
      })
      .catch(error => {
        console.log('Помилка при отриманні параметрів з сервера:', error);
      });
  }

  return{
    getParameters,
    getParametersFromServer,
  }
  
}

const gameLobbyParameters = makeGameLobbyParameters();

function loseGame(){
  clearTimeout(timer);
  inputWord.removeEventListener('keydown', handleEnterKey);
  gameOver.classList.add('active');
}

function winGame(){
  clearTimeout(timer);
  inputWord.removeEventListener('keydown', handleEnterKey);
  endGameBorder.innerHTML = 'You won!!!';
  gameOver.classList.add('active');
}

function makeHeartColorChanger() {
  const hearts = document.querySelectorAll('.hearts img');
  const totalHearts = hearts.length;
  let heartIndex = totalHearts - 1;

  return function () {
    hearts[heartIndex].classList.add('gray');
    heartIndex--;

    if (heartIndex < 0) {
      loseGame();
    }
  };
}

const removeHearts = makeHeartColorChanger();

function makeCounter(){
  let points = 0;
  return function(word){
    points += word.length; //We add length of correct word to points. One letter- one point
    counterValue.innerHTML = points;
    if(points >= pointTarget){
      winGame();
    }
  }
}

const addPoints = makeCounter();

function wordReq(){
  fetch('/getWord')
    .then(response => response.json())
    .then(data => {
      messageWindow.innerText = data.word;
    })
    .catch(error => {
      console.log('Помилка при отриманні слова:', error);
    });
}

function startTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('Таймер завершився. Ти невстиг!');
    borderColor(false);
    wordReq();
    startTimer();
    removeHearts();
  }, timeToCheck);
}

function borderColor(isCorrect) {
  const inputBorder = inputWord.style;

  if (isCorrect) {
    inputBorder.borderColor = 'green';
    inputBorder.setProperty('--input-border-opacity', '1');
    inputWord.value = '';
  } else {
    inputBorder.borderColor = 'red';
    inputBorder.setProperty('--input-border-opacity', '1');
    inputWord.classList.add('shake-animation');
    inputWord.addEventListener('animationend', removeAnimation);
  }
}

function removeAnimation() {
  inputWord.classList.remove('shake-animation');
}

function checkCorrectness(answer, word){
  if(answer.success === true){
    wordReq();
    startTimer();
    addPoints(word);
    borderColor(true);
  } else{
    borderColor(false);
  }
}

function sendWordToCheck(){
  const inputValue = inputWord.value;

  fetch('/postText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: inputValue }),
  })
    .then(response => response.json())
    .then(result => {
      console.log('Отримано результат від сервера:', result);
      checkCorrectness(result, inputValue);
    })
    .catch(error => {
      console.log('Сталася помилка:', error);
  });
}