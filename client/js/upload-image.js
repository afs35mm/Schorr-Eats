// const uploadedImgsEl = document.querySelector('.uploaded-imgs ul');

// document.querySelector('.imgUpload').addEventListener('change', function() {
//     if (this.files) {
//         [...this.files].forEach((file) => {
//             const img = document.createElement('img');
//             img.src = URL.createObjectURL(file); // set src to file url
//             const li = document.createElement('li');
//             li.appendChild(img);
//             uploadedImgsEl.appendChild(li);
//         });
//     }
// });
var uploadImage = angular.module('uploadImage', []);

uploadImage.controller('UploadImageController', ['$scope', function($scope) {

    $scope.images = [];

    $scope.uploadImage = function() {
        console.log(this);
    }

    $scope.uploadFile = function(files) {
        const fileListArr = Array.from(files)
        fileListArr.forEach(function(file) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file); // set src to file url
            $scope.$apply(function() {
                $scope.images.push(img);
            });
        });
    }
    console.log($scope);
}]);

// uploadImage.directive('ngFileModel', ['$parse', function($parse) {
//     console.log($parse);
//     return {
//         link: function(scope, element, attrs) {
//             console.log(scope, element, attrs);
//             var model = $parse(attrs.ngFileModel);
//             console.log(model);
//         }
//     }
// }])
