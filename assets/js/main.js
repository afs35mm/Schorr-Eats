//angular.module('eatsTodo', ['todoController', 'todoService']);

// main.js
$ = require('jquery');
$('body').css('background', 'green');
var _ = require('underscore');
 
_.each([1, 2, 3], function (n) {
  //console.log(n); //=> 1, 2, 3
});  
// "Hello"
(function(){    
	console.log('hello!');
	
	//$('body').css('background', 'red');  
	console.log('see ya');
}());    

var greeting = require('./greetings');

console.log(greeting);