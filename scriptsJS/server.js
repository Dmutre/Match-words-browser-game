'use strict';

const path = require('node:path');
const express = require('express');
const { getRandWordPart, dictionaryManager, gameLobbyParameters, } = require('./tools');
const app = express();
const PORT = 3000;

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys');
const startLobbyPath = path.join(__dirname, '..', 'StartLobby');
const gameLobbyPath = path.join(__dirname, '..', 'GameLobby');
const commonIconsPath = path.join(__dirname, '..', 'commonIcons');

app.use(express.static(startLobbyPath));
app.use(express.static(gameLobbyPath));
app.use(express.static(commonIconsPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(startLobbyPath, 'StartLobby.html'));
});

app.get('/gameLobby', async (req, res) => {
  let language = gameLobbyParameters.get().language;
  await dictionaryManager.readDictionary(dictionaryPath, language);
  res.sendFile(path.join(gameLobbyPath, 'GameLobby.html'));
});

app.get('/getWord', (req, res) => {
  const word = getRandWordPart();
  res.json({ word: word });
});

app.post('/getParameters', (req, res) => {
  let parameters = req.body;
  gameLobbyParameters.set(parameters);
  res.json({ ok: true });
});

app.post('/postText', (req, res) => {
  let text = req.body.text;
  console.log('Отримано текст з клієнта:', text);
  if(dictionaryManager.acceptWord(text)){
    res.json({ success: true });
  } else res.json({ success: false });
});

app.listen(PORT, ()=>{
  console.log('We track port ' + PORT);
});