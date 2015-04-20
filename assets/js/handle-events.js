'use strict';

window.$ = window.jQuery = require('jquery');

module.exports = {

	'$signupForm' : $('.signup-form'),

	init: function (){
		var formEl = this.$signupForm;
		this.$signupForm.on('submit', this.validateForm);
	},

	validateForm: function(e){ 
		
		var preventSubmit = false;

		$(this).find('.form-control').each(function(index, value){
			var $textInput = $(this);
			if($textInput.val().trim() === ''){
				$textInput.parent('.form-group').addClass('has-error');
				preventSubmit = true;
			}
			if($textInput.parent('.form-group').hasClass('has-error') && $textInput.val().trim() !== ''){
				console.log('removing class');
				$textInput.parent('.form-group').removeClass('has-error');	
			}
		});
		if(preventSubmit) e.preventDefault();
	}

} 