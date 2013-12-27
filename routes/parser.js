'use strict'

var htmlparser = require('htmlparser2');
var request = require('request');
var select = require('soupselect').select;

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
    // concatDom(dom);
    var titles = select(dom, '#articlebody');
    titles.forEach(function(title){
      console.log(title);
    });
    console.log('made it here still');
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

