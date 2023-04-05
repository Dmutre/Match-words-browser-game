"use strict";

const fs = require('node:fs').promises;
const path = require('node:path');
const words = [];

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys', 'English-dict.txt');
//console.log(dictionaryPath);

async function main() {
  try {
    const data = await fs.readFile(dictionaryPath, "utf-8");
    words = data.split("\n");
    console.log("Work is done");
    console.log(getRandWordPart());
  } catch (error) {
    console.error(error);
  }
}

function getRandNumberInRange(start, end){
  const number = Math.floor(Math.random() * (end - start) +start);
  return number;
}

function getRandWord(){
  const randKey = getRandNumberInRange(0, words.length);
  console.log(words.length);
  const randWord = words[randKey];
  console.log(typeof randWord);
  return randWord;
}

function getRandWordPart(){
  let randWord = getRandWord();
  const startIndex = Math.floor(Math.random() * (randWord.length - 2)); // choose random starting index
  const endIndex = startIndex + Math.floor(Math.random() * 2) + 1; // choose random ending index (2-3 characters long)
  return randWord.slice(startIndex, endIndex); // extract substring and return it
}



main();