"use strict";

const fs = require('node:fs').promises;
const path = require('node:path');
let words = [];

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys', 'English-dict.txt');
//console.log(dictionaryPath);

async function Start(){
  await fetch('http://localhost:3000/')
  .then(response => response.text())
  .then(data => {
    words = data.split("\n");
    console.log("Work is done");
  })
  .catch(error => {
    console.error(error);
  });
}

/*
async function main() {
  try {
    const data = await fs.readFile(dictionaryPath, "utf-8");
    words = data.split("\n");
    console.log("Work is done");
    return words;
  } catch (error) {
    console.error(error);
  }
}*/

function getRandNumberInRange(start, end){
  const number = Math.floor(Math.random() * (end - start) +start);
  return number;
}

async function getRandWord(){
  if (words.length === 0) {
    words = await main();
  }
  const randKey = getRandNumberInRange(0, words.length);
  const randWord = words[randKey];
  console.log(randWord);
  return randWord;
}

async function getRandWordPart() {//part from 2 to 3 letters
  const randWord = await getRandWord();
  const startIndex = getRandNumberInRange(0, randWord.length - 3);
  const endIndex = startIndex + Math.floor(Math.random() * 2) + 2;
  return randWord.slice(startIndex, endIndex);
}
/*
getRandWordPart().then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});
*/