const uploadedImgsEl = document.querySelector('.uploaded-imgs ul');

document.querySelector('.imgUpload').addEventListener('change', function() {
    if (this.files) {
        [...this.files].forEach((file, i) => {
            const img = document.createElement('img');
            img.setAttribute('ng-model', 'editingItem.photos[' + i + ']');
            img.src = URL.createObjectURL(file); // set src to file url
            const li = document.createElement('li');
            li.appendChild(img);
            uploadedImgsEl.appendChild(li);
        });
    }
});

// var uploadImage = angular.module('uploadImage', []);
// uploadImage.controller('UploadImageController', ['$scope', function($scope) {
//     $scope.uploadImage = function() {
//         console.log(this);
//         consol
//     }
// }]);