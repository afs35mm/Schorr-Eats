$ = require('jquery');

module.exports = {
  sayHelloInEnglish: function() {
    return "HELLO";
  },
        
  sayHelloInSpanish: function() {
    jQuery('body').css('background', 'red');
    return "Hola";
  }

  

};