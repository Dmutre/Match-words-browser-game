'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const app = express();
const PORT = 3000;

let words = [];
let currentWord;

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys');
const startLobbyPath = path.join(__dirname, '..', 'StartLobby');
const gameLobbyPath = path.join(__dirname, '..', 'GameLobby');

app.use(express.static(startLobbyPath));
app.use(express.static(gameLobbyPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(startLobbyPath, "StartLobby.html"));
});

app.get('/gameLobby', (req, res) => {
  readDictionary(dictionaryPath);
  res.sendFile(path.join(gameLobbyPath, 'GameLobby.html'));
});

app.get('/getWord', (req, res) => {
  const word = getRandWord(); 

  res.json({ word: word });
});

function readDictionary(dic) {
  fs.readFile(path.join(dic, 'English-dict.txt'), 'utf-8', (err, data) => {
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


app.listen(PORT, ()=>{
  console.log('We track port ' + PORT);
});