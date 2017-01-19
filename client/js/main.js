'use strict';

window.$ = window.jQuery = require('jquery');

require('angular');

require('./lib/bootstrap.min.js');
require('./lib/star-rating.min.js');
require('./controllers');
require('./services/todos.js');

angular.module('eatsTodo', ['todoController', 'todoService']);

var events = require('./handle-events.js');

events.init();
//map.init();
// $('.starRating').each(function(){
// 	console.log(this);
// });

// $('.starRating').rating();