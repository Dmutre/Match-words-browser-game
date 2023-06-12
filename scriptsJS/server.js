'use strict';

const path = require('node:path');
const express = require('express');
const { getRandWordPart, dictionaryManager, gameLobbyParametersKeeper, } = require('./dictionaryManager');
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
  const language = gameLobbyParametersKeeper.get().language;
  try{
    await dictionaryManager.readDictionary(dictionaryPath, language);
    res.sendFile(path.join(gameLobbyPath, 'GameLobby.html'));
  } catch(err){
    console.log(err);
    res.status(500).send('Server error. Can`t read file');
  }
});

app.get('/getWord', (req, res) => {
  const word = getRandWordPart();
  res.json({ word: word });
});

app.post('/getParameters', (req, res) => {
  const parameters = req.body;
  gameLobbyParametersKeeper.set(parameters);
  res.json({ ok: true });
});

app.get('/gameParameters', (req, res) => {
  const parameters = gameLobbyParametersKeeper.get();
  res.json({ parameters });
});

app.post('/postText', (req, res) => {
  const text = req.body.text;
  console.log('Отримано текст з клієнта:', text);
  if(dictionaryManager.acceptWord(text)){
    res.json({ success: true });
  } else res.json({ success: false });
});

app.listen(PORT, ()=>{
  console.log('We track port ' + PORT);
}); 