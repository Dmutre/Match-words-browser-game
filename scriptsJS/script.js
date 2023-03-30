"use strict";

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Dictionarys', 'English-dict.txt');
console.log(filePath);

const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", (event) =>{
  const file = event.target.file[0];

  const reader = new FileReader();

  // Set the onload function to handle the file contents
  reader.onload = (event) => {
    const contents = event.target.result;
    console.log(contents);
  };

  // Read the file as text
  console.log(reader.readAsText(file));
})

function Button(){
  console.log("hello");
}

function Start(){
  const myPromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }).then(console.log("work is done"));
}