'use strict'

var htmlparser = require('htmlparser2');

var handler = new htmlparser.DomHandler(function (error, dom){
  if (error) {
    console.log('parser.js error ln 5', error);
  } else {
    console.log('parser.js success ln 7, dom:', dom);
  }
});

var parser = new htmlparser.Parser(handler);

exports.parser = function(req, res){
  console.log(JSON.parse(req.body.url));
  parser.write(JSON.parse(req.body.url));
  res.send(JSON.parse(req.body.url));
  parser.done();
};
