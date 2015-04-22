'use strict';

window.$ = window.jQuery = require('jquery');

require('angular'); 

require('./lib/bootstrap.min.js');
require('./lib/star-rating.min.js');
require('./controllers');
require('./services/todos.js');

angular.module('eatsTodo', ['todoController', 'todoService']);

var events = require('./handle-events.js');
//var map = require('./google-maps.js');

events.init();
//map.init();
$("#input-id").rating();