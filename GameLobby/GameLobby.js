'use strict';

const messageWindow = document.getElementById('messageWindow');
const inputWord = document.getElementById('inputWord');
const endGameBorder = document.getElementById('finalBorder');
const counterValue = document.getElementById('counterValue');
const gameOver = document.querySelector('.game-over');
const timeToCheck = 10000; // Час для введення слова до його зміни та позначення як незнайденого

document.addEventListener('DOMContentLoaded', initialFunction);
inputWord.addEventListener('keydown', handleEnterKey);

function handleEnterKey(e) {
  if (e.key === 'Enter') {
    sendWordToCheck();
  }
}

function makeTimerManager(){
  let timer;

  function startTimer(){
    clearTimeout(timer);
    timer = setTimeout(() => {
    console.log('Таймер завершився. Ти не встиг!');
    borderColor(false);
    wordReq();
    startTimer();
    heartManager.removeHeart();
    }, timeToCheck);
  }

  function clearTimer(){
    clearTimeout(timer);
  }

  return{
    startTimer,
    clearTimer,
  }
}

const timerManager = makeTimerManager();

function initialFunction() {
  gameLobbyParameters.getParametersFromServer();
  wordReq();
  timerManager.startTimer();
}

function reloadPage() {
  location.reload();
}

function makeGameLobbyParameters() {
  let hearts, score; // Кількість сердець та потрібна кількість балів для перемоги

  function getParameters() {
    return {
      hearts,
      score,
    };
  }

  function setParameters(parameters) {
    hearts = parameters.hearts;
    score = parameters.score;
    console.log(hearts + '\n' + score);
    heartManager.createHearts(hearts);
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

  return {
    getParameters,
    getParametersFromServer,
  };
}

const gameLobbyParameters = makeGameLobbyParameters();

function loseGame() {
  timerManager.clearTimer();
  inputWord.removeEventListener('keydown', handleEnterKey);
  gameOver.classList.add('active');
}

function winGame() {
  timerManager.clearTimer();
  inputWord.removeEventListener('keydown', handleEnterKey);
  endGameBorder.innerHTML = 'Ти переміг!!!';
  gameOver.classList.add('active');
}

function makeHeartColorChanger() {
  let heartIndex;
  let hearts = []; // Зберігатиме посилання на всі елементи сердець

  function createHearts(){
    const heartsContainer = document.querySelector('.hearts');
    const totalHearts = gameLobbyParameters.getParameters().hearts;
    console.log(totalHearts);

    for (let i = 0; i < totalHearts; i++) {
      const heartImg = document.createElement('img');
      heartImg.src = 'heart.png';
      heartImg.alt = 'Heart Icon';
      hearts.push(heartImg);
      heartsContainer.appendChild(heartImg);
    }
    heartIndex = totalHearts - 1;
  }

  function removeHeart() {
    hearts[heartIndex].classList.add('gray');
    heartIndex--;

    if (heartIndex < 0) {
      loseGame();
    }
  };

  return{
    createHearts,
    removeHeart,
  }
}

const heartManager = makeHeartColorChanger();

function makeCounter() {
  let points = 0;
  return function (word) {
    points += word.length; // Додаємо довжину правильного слова до балів. Один символ - один бал
    counterValue.innerHTML = points;
    if (points >= gameLobbyParameters.getParameters().score) {
      winGame();
    }
  };
}

const addPoints = makeCounter();

function wordReq() {
  fetch('/getWord')
    .then(response => response.json())
    .then(data => {
      messageWindow.innerText = data.word;
    })
    .catch(error => {
      console.log('Помилка при отриманні слова:', error);
    });
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

function checkCorrectness(answer, word) {
  if (answer.success) {
    wordReq();
    timerManager.startTimer();
    addPoints(word);
  }

  borderColor(answer.success);
}

function sendWordToCheck() {
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