"use strict";


const http = require('node:http');
const fs = require('node:fs');
const path = require("node:path");
const express = require('express');
const app = express();
const PORT = 3000;

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys', 'English-dict.txt');



app.get('/', (req, res) => {
  // Send the HTML file with the button to the client
  res.sendFile(path.join(__dirname, '..', '/StartLobby.html'));
});

app.get('/getdata', (req, res) => {
  // Read the contents of the text file
  fs.readFile(dictionaryPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the contents of the text file as the response
      res.send(data);
    }
  });
});


app.listen(PORT, ()=>{
  console.log("we track port " + PORT);
});

/*
const server = http.createServer((req, res) => {
  if(req.url == "/"){
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    fs.createReadStream(path.join(__dirname, '..', 'StartLobby.html')).pipe(res);
  } else if(req.url == "/GameLobby"){
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    fs.createReadStream(path.join(__dirname, '..', 'GameLobby.html')).pipe(res);
  } else{
    fs.readFile(dictionaryPath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end();
        return;
      }
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
      });
    }
});

function hello(){
  console.log("Hello Node js");
}


server.listen(3000, '127.0.0.1');
console.log("We track port 3000");
*/