'use strict';

window.$ = window.jQuery = require('jquery');

module.exports = {

	'$signupForm' : $('.signup-form'),
	'$addForm' : $('.add-restaurant-form'),

	init: function (){
		var self = this;
		this.$signupForm.on('submit', this.validateSingupForm);
		this.$addForm.on('click .btn-primary', function(){
			self.validateAddForm();
		});
	},

	//TO DO - put each validation in a helper method
	validateSingupForm: function(e){ 
		
		var preventSubmit = false;

		$(this).find('.form-control').each(function(index, value){
			var $textInput = $(this);
			if($textInput.val().trim() === ''){
				$textInput.parent('.form-group').addClass('has-error');
				preventSubmit = true;
			}
			if($textInput.parent('.form-group').hasClass('has-error') && $textInput.val().trim() !== ''){
				$textInput.parent('.form-group').removeClass('has-error');	
			}
		});
		if(preventSubmit) e.preventDefault();
	},

	validateAddForm: function() {
		var preventSubmit = false;
		this.$addForm.find('.required').each(function(index, value){
			console.log(this);
			var $textInput = $(this);
			if($textInput.val().trim() === ''){
				$textInput.parent('.form-group').addClass('has-error');
				preventSubmit = true;
			}
			if($textInput.parent('.form-group').hasClass('has-error') && $textInput.val().trim() !== ''){
				$textInput.parent('.form-group').removeClass('has-error');	
			}
		});
		if(preventSubmit) return false;
	}
} 