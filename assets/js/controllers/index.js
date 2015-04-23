var app = angular.module('todoController', []);

app.directive('onLastRepeat', function($timeout) {
    return function (scope, elm, attrs) {
        if (scope.$last) {
            $timeout(function () {
                scope.$eval(attrs.onLastRepeat);
            });
        }
    };
});
	
app.controller('mainController', ['$scope', '$rootScope', '$http','Todos', function($scope, $rootScope, $http, Todos) {
	$scope.formData = {};
	$scope.loading = true;
	
	$scope.$watch('userName', function () {
	    $scope.userName = $scope.userName;
	    console.log($scope.userName);
	});

	Todos.get() .success(function(data) {    
		$scope.todos = data;  
		$scope.loading = false;
	});  

	$scope.createTodo = function() {
		if ($scope.formData.name != undefined) {
			$scope.loading = true;
			Todos.create($scope.formData)
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; 
					$scope.todos = data; 

					$(function () {
					   $('#addModal').modal('toggle');
					});

				}); 
		}
	};

	$scope.finishedRepeat = function(){
		$('.starRatingView').each(function(){
			$(this).rating({ 
				'showCaption' : false, 
				'max' : '5',
				'hoverEnabled': false,
				'showClear' : false,
				'readonly': true,
			});
		});
		
		$('.starRatingEdit').add('.starRatingAdd').rating({
			'showClear' : false,
			'showCaption' : false, 
		});
	};

	$scope.deleteTodo = function() {
		
		var result = window.confirm('Are you absolutely positively sure you want to delete this!???'); 
		if(!result) return;
		$scope.loading = true;
		Todos.delete($scope.originalItem._id)
			.success(function(data) {
				$scope.loading = false;
				$scope.todos = data; 
				$(function () {
				   $('#editModal').modal('toggle');
				});
			});
	}; 

	$scope.editTodo = function(todo) {
		$scope.editingItem = angular.copy(todo);
		$scope.originalItem = todo;
		console.log($scope.editingItem.rating);
		$('#editModal').find('.starRatingEdit').rating('update', $scope.editingItem.rating);
	};

	$scope.updateTodo = function() { 
		Todos.update($scope.editingItem)
			.success(function(data) {
				$scope.todos = data;   
				$scope.loading = false;
				$(function () {
				   $('#editModal').modal('toggle');
				});
			});
	};

}]);


