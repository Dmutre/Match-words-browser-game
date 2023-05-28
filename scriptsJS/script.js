"use strict";

const fs = require('node:fs');
const path = require('node:path');

let words = [];
let currentWord;

function readDictionary(dic) {
  fs.readFile(dic, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data is reading');
      words = data.split('\n').map(word => word.trim());
      console.log('Data is completely read');
    }
  });
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
