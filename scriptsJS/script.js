"use strict";

const { getRandomValues } = require('node:crypto');
const fs = require('node:fs').promises;
const path = require('node:path');
let words = [];

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys', 'English-dict.txt');
console.log(filePath);



fs.readFile(dictionaryPath, "utf-8").then( (data) => {
  words = data.split("\n");
  console.log("Work is done");
}).catch((error) =>{
  console.error(error);
})


function getRandWord(){
  const keys = Array.from(Words.keys());
  const randIndex = Math.floor(Math.random() * keys.length);
  const randKey = keys[randIndex];
  const randWord = Words.get(randKey);
  return randWord;
}

function getRandWordPart(){
  const partLength = Math.random() * 1 + 2;//random length of word`s part (from 2 to 3)
  const randWord = getRandWord();
  const startIndex = Math.floor(Math.random() * (word.length - 2));
  const wordPart = randWord.substr(startIndex, length);

  return wordPart;
}