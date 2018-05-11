var Pikaday = require('pikaday');
var datesFieldEls = [];

Array.prototype.slice.call(document.querySelectorAll('.dateField')).forEach(function(dateEl) {
    datesFieldEls.push(new Pikaday({
        field: dateEl,
        format: 'MMM D YYYY',
    }));
});