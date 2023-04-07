"use strict";


let http = require("http");

let server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('We track port 3000');
  console.log("We track server");
});

server.listen(3000, '127.0.0.1');
console.log("We track port 3000");