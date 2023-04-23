"use strict";

let words = [];
let currentWord;

async function Start(){
  await fetch('http://localhost:3000/data')
  .then(response => response.text())
  .then(data => {
    words = data.split("\n");
    console.log("Work is done");
  })
  .catch(error => {
    console.error(error);
  });
}

function hello(){
  console.log("Hello Node js");
}

function getRandNumberInRange(start, end){
  const number = Math.floor(Math.random() * (end - start) +start);
  return number;
}

function getRandWord(){
  const randKey = getRandNumberInRange(0, words.length);
  currentWord = words[randKey];
  console.log(currentWord);
  return currentWord;
}

function getRandWordPart() {//part from 2 to 3 letters
  const randWord = getRandWord();
  const startIndex = getRandNumberInRange(0, randWord.length - 3);
  const endIndex = startIndex + Math.floor(Math.random() * 2) + 2;
  return randWord.slice(startIndex, endIndex);
}

function matchWord(word){
  if(word === currentWord) return true;
  else return false;
}

async function Call(){
  await Start();
  console.log(getRandWordPart());
}

Call();