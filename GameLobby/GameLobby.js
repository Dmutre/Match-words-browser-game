"use strict";

import {matchWord, Call, getRandWordPart} from "./script.js";

Call();
let wordPart;
const wordInout = document.getElementById("wordInput");

function check(){
  flag = matchWord(wordInput.value);
  if(flag === true) console.log("good job");
  else console.log("Bad try");
}