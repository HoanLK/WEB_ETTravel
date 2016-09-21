frontApp.controller("childCategoryPostController", ['$scope', '$http', '$window', 'CategoryPost', function ($scope, $http, $window, CategoryPost) {
    $scope.categories = [];
    $scope.posts = [];
    $scope.idCategory = angular.element('#idCategory').val();


    $http.get('/API/CategoriesAPI/')
        .success(function (data) {
            var categories = CategoryPost.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == $scope.idCategory) {
                    $scope.categories.push(value);
                }
            });
        })
    $http.get('/API/PostsAPI/')
        .success(function (data) {
            angular.forEach(data, function (value, key) {
                if (value.idCategory == $scope.idCategory) {
                    $scope.posts.push(value);
                }
            });
        });
}]);