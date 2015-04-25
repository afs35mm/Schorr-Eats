'use strict';

window.$ = window.jQuery = require('jquery');

module.exports = {

	init: function (){
		$('.validate-form').on('click', this.validateForm);
	},


	validateForm : function(){
		var $parentForm = $(this).parents('form'),
			preventSubmit = false;

		$parentForm.find('.required').each(function(index, value){
			var $textInput = $(this);
			if($textInput.val().trim() == ''){
				$textInput.parent('.form-group').addClass('has-error');
				preventSubmit = true;
			}
			if($textInput.parent('.form-group').hasClass('has-error') && $textInput.val().trim() !== ''){
				$textInput.parent('.form-group').removeClass('has-error');	
			}
		});
		if(preventSubmit) return false;
	},

} 