"use strict";


const http = require('node:http');
const fs = require('node:fs');
const path = require("node:path");

const dictionaryPath = path.join(__dirname, '..', 'Dictionarys', 'English-dict.txt');


const server = http.createServer((req, res) => {
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
});

server.listen(3000, '127.0.0.1');
console.log("We track port 3000");