'use strict';

window.$ = window.jQuery = require('jquery');

require('angular'); 

require('./lib/bootstrap.min.js');
require('./controllers');
require('./services/todos.js');

angular.module('eatsTodo', ['todoController', 'todoService']);

var events = require('./handle-events.js');

events.init();
