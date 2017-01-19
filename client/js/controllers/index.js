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
	});

	Todos.get().then(function(data) {
		$scope.todos = data.data;
		$scope.loading = false;
	});

	$scope.createTodo = function() {
		if ($scope.formData.name != undefined) {
			$scope.loading = true;
			$scope.formData.user = $scope.userName;

			$('#addModal').find('.starRatingAdd').rating('clear');

			Todos.create($scope.formData)
				.then(function(data) {
					$scope.loading = false;
					$scope.formData = {};
					$scope.todos = data.data;
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
		$('.contentRow').each(function(){
			$(this).fadeIn();
		});
	};

	$scope.deleteTodo = function() {

		var result = window.confirm('Are you absolutely positively sure you want to delete this!???');
		if(!result) return;
		$scope.loading = true;
		Todos.delete($scope.originalItem._id)
			.then(function(data) {
				$scope.loading = false;
				$scope.todos = data.data;
				$(function () {
				   $('#editModal').modal('toggle');
				});
			});
	};

	$scope.editTodo = function(todo) {
		$scope.editingItem = angular.copy(todo);
		$scope.originalItem = todo;
		$scope.editingItem.author = $scope.userName;
		//loop through the restaurant ratings array and see if the person has rated already
		var i = 0;
		while( i <  $scope.editingItem.ratings.length){
			$scope.editingItem.currentUserRating = {}
			if($scope.editingItem.ratings[i].author === $scope.userName){
				$scope.editingItem.currentUserRating = $scope.editingItem.ratings[i];
				$('#editModal').find('.starRatingEdit').rating('update', $scope.editingItem.currentUserRating.rating);
				break;
			}
			i++;
		}
	};

	$scope.updateTodo = function() {
		Todos.update($scope.editingItem)
			.then(function(data) {
				$scope.todos = data.data;
				$scope.loading = false;
				$(function () {
				   $('#editModal').modal('toggle');
				});
			});
	};

}]);


