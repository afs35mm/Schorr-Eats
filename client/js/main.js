'use strict';

window.$ = window.jQuery = require('jquery');

require('angular');

require('./lib/bootstrap.min.js');
require('./lib/star-rating.min.js');
require('./lib/date-picker');
require('./controllers');
require('./upload-image');
require('./services/todos.js');

/*'uploadImage'*/
angular.module('eatsTodo', ['todoController', 'todoService', 'uploadImage']);

var events = require('./handle-events.js');

events.init();
//map.init();
// $('.starRating').each(function(){
// 	console.log(this);
// });

// $('.starRating').rating();