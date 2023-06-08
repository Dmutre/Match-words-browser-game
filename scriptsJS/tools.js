'use strict';

const fs = require('node:fs');
const path = require('node:path');

const DictionarysPath = {
  eng: 'English-dict.txt',
  ua: 'Ukrainian-dict.txt',
};

function makeDictionaryManager() {
  const Dictionarys = {
    eng: [],
    ua: [],
  };

  let currentDict = '';
  let currentPart = '';

  async function readDictionary(dicPath, dict) {
    currentDict = dict;
    if (Dictionarys[dict] && Dictionarys[dict].length !== 0) return;

    try {
      const data = await fs.promises.readFile(
        path.join(dicPath, DictionarysPath[dict]),
        'utf-8'
      );
      console.log('Data is reading');
      Dictionarys[dict] = data.split('\n').map(word => word.trim().toLowerCase());
      console.log('Data is completely read');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error with reading data');
    }
  }

  function getRandWord() {
    if (!currentDict) {
      console.log('You haven`t read the dictionary');
      return '';
    }

    const key = getRandNumberInRange(0, Dictionarys[currentDict].length);
    console.log(Dictionarys[currentDict][key]);
    return Dictionarys[currentDict][key];
  }

  function setCurrentPart(part){
    currentPart = part;
  }

  function acceptWord(gottenWord){
    if(gottenWord.toLowerCase().includes(currentPart) && Dictionarys[currentDict].includes(gottenWord.toLowerCase())){
      return true;
    } else return false;
  }

  return {
    readDictionary,
    getRandWord,
    setCurrentPart,
    acceptWord,
  };
}

const dictionaryManager = makeDictionaryManager();

function randWordPart(word) {
  const startIndex = getRandNumberInRange(0, word.length - 3);
  const endIndex = startIndex + Math.floor(Math.random() * 2) + 2;
  return word.slice(startIndex, endIndex);
}

function getRandNumberInRange(start, end) {
  const number = Math.floor(Math.random() * (end - start) + start);
  return number;
}

function getRandWordPart() {
  const randomWord = dictionaryManager.getRandWord();
  const randomWordPart = randWordPart(randomWord);
  dictionaryManager.setCurrentPart(randomWordPart);
  return randomWordPart;
}

function makeGameLobbyParameters() {
  let language = 'eng';
  let hearts = 3;
  let score = 30;

  function set(data) {
    language = data.language;
    hearts = data.hearts;
    score = data.score;

    console.log('Встановлені параметри:\n', data);
  }

  function get() {
    return {
      language,
      hearts,
      score,
    };
  }

  return {
    get,
    set,
  };
}

const gameLobbyParameters = makeGameLobbyParameters();

module.exports = {
  dictionaryManager,
  gameLobbyParameters,
  getRandWordPart,
};