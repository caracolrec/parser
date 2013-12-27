'use strict'

var htmlparser = require('htmlparser2');
var request = require('request');

var concatDom = function(dom){
  var results = '';
  var recurse = function(dom){
    for (var i=0; i<dom.length; i++){
      if (dom[i].type === 'text' && dom[i].data && dom[i].data !== ' '){
        results = results.concat(dom[i].data + ' ');
      }
      if (dom[i].children){
        recurse(dom[i].children);
      }
    }
  };
  recurse(dom);
  console.log(results);
  return results;
};

var handler = new htmlparser.DomHandler(function (error, dom){
  if (error) {
    console.log('parser.js error ln 5', error);
  } else {
    concatDom(dom);
    console.log('parser.js success ln 7, dom:', dom);
  }
}, {normalizeWhitespace: true});

var parser = new htmlparser.Parser(handler);

exports.parser = function(req, res){
  request(JSON.parse(req.body.url), function(error, response, body){
    if(!error && response.statusCode == 200){
      parser.write(body);
      parser.done();
    } else if (error) {
      console.log('there appears to be an error', error);
    }
  });
};

//write function to plug into handler success function
//this will be the main algorithm

