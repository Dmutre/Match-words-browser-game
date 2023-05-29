'use strict';

document.addEventListener('DOMContentLoaded', initialFunction);
const messageWindow = document.getElementById('messageWindow');
const inputWord = document.getElementById('inputWord');
const timeToCheck = 10000;//Time to input word before it change and count as unfound
let timer;

inputWord.addEventListener('keydown', (e) => {if(e.key === 'Enter') sendWord()});

function initialFunction(){
  wordReq();
  startTimer();
}

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

function sendWord(){
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
      if (result.success === true) {
        wordReq();
        startTimer();
        borderColor(true);
      } else{
        borderColor(false);
      }
    })
    .catch(error => {
      console.log('Сталася помилка:', error);
  });
}