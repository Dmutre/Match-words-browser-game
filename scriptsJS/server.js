'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const app = express();
const PORT = 3000;

let words = [];
const word = {
  current: '',
  currentPart: '',
};

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys');
const startLobbyPath = path.join(__dirname, '..', 'StartLobby');
const gameLobbyPath = path.join(__dirname, '..', 'GameLobby');

app.use(express.static(startLobbyPath));
app.use(express.static(gameLobbyPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(startLobbyPath, "StartLobby.html"));
});

app.get('/gameLobby', (req, res) => {
  readDictionary(dictionaryPath);
  res.sendFile(path.join(gameLobbyPath, 'GameLobby.html'));
});

app.get('/getWord', (req, res) => {
  const word = getRandWordPart(); 
  res.json({ word: word });
});

app.post('/postText', (req, res) => {
  let text = req.body.text;
  console.log('Отримано текст з клієнта:', text);
  if(acceptWord(text)){
    res.json({ success: true });
  } else res.json({ success: false });
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

app.listen(PORT, ()=>{
  console.log('We track port ' + PORT);
});