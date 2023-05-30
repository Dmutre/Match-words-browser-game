'use strict';

const fs = require('node:fs');
const path = require('node:path');

const Dictionarys = {
  eng: 'English-dict.txt',
  ua: 'Ukrainian-dict2.0.txt',
}

let words;
const word = {
  current: '',
  currentPart: '',
};

function readDictionary(dicPath, dic) {
  fs.readFile(path.join(dicPath, Dictionarys[dic]), 'utf-8', (err, data) => {
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
  word.current = words[randKey];
  console.log(word.current);
  return word.current;
}

function getRandWordPart() {//part from 2 to 3 letters
  const randWord = getRandWord();
  const startIndex = getRandNumberInRange(0, randWord.length - 3);
  const endIndex = startIndex + Math.floor(Math.random() * 2) + 2;
  word.currentPart = randWord.slice(startIndex, endIndex);
  return word.currentPart;
}

function acceptWord(gottenWord){
  if(gottenWord.toLowerCase().includes(word.currentPart) && words.includes(gottenWord.toLowerCase())){
    return true;
  } else return false;
}

module.exports = {
  readDictionary,
  acceptWord,
  getRandWordPart,
  words,
  word,
}