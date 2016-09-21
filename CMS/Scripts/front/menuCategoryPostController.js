frontApp.controller("menuCategoryPostController", ['$scope', '$http', '$window', 'CategoryPost', function ($scope, $http, $window, CategoryPost) {
    $scope.categories = [];
    $scope.posts = [];


    $http.get('/API/CategoriesAPI/')
        .success(function (data) {
            var categories = CategoryPost.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == 1) {
                    $scope.categories.push(value);
                }
            });
        });

    $http.get('/API/PostsAPI/')
        .success(function (data) {
            var sum = data.length;
            var count = 0;
            var random1 = Math.floor((Math.random() * sum) + 1);
            var random2 = Math.floor((Math.random() * sum) + 1);
            var random3 = Math.floor((Math.random() * sum) + 1);
            angular.forEach(data, function (value, key) {
                if ((value.featured == 1) && (key == random1 || key == random2 || key == random3) && (count < 4)) {
                    count++;
                    $scope.posts.push(value);
                }
            });
        });
}]);