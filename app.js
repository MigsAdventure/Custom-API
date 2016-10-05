const PORT = 8000;
const http = require('http');
const qs = require('querystring');
const md5 = require('md5');
const moment = require('moment')



const server = http.createServer((req,res) => {

let {method, url} = req;
console.log(`${method} ${url}`) 
// let [path, queryStr] = url.split('?');
// let query = qs.parse(queryStr);

let urlChunks = url.split('/');
let [na, path, argument,num1,num2] = urlChunks;
let email = `/${md5(`${argument}`)}`;
let bday = `/${argument}`
let sentence = `/${argument}`
let total = 0;

switch(method) {

    case 'GET' :
      switch(path) {
        case 'math' :
          if (argument === 'add') {
            total = eval(num1) + eval(num2);
          } 
          else if (argument === 'minus') {
            total = eval(num1) - eval(num2);
          }
          else if (argument === 'multiply') {
            total = eval(num1) * eval(num2);
          } else if (argument === 'divide') {
            total = eval(num1) / eval(num2);
          }
          res.end(`${total}`)
          break;

        case 'gravatar' :
          res.end(`http://gravatar.com/avatar${email}`)
          break;

        case 'sentence':
          let chars = sentence.length - 1;
          let words = sentence.split('%').length;
          let avg = chars / words;
          
          let sentInfo  = {
            words: words,
            chars: chars,
            avg: avg
          }

          res.end(JSON.stringify(sentInfo));
          break;

        case 'birthday':
        res.end(`${moment(`${bday}`, "MMDDYYYY").fromNow()}`);
        break;
      }

  
    default:
      res.statusCode = 404;
      res.end('Not Found')
}

  

});

server.listen(PORT, err => {
  console.log(err || `server listening on port ${PORT}`);
});

// For example, a GET to /math/add/40/16 would respond with 56.