frontApp.controller("showPostController",['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
    $scope.post = {};
    $scope.relatedPosts = [];
    $scope.idCategoryPost = "";
    $scope.idPost = angular.element('#idPost').val();

    $http.get('/API/PostsAPI/' + $scope.idPost)
        .success(function (data) {
            $scope.post = data;
            $scope.post.content = $sce.trustAsHtml(data.content)
            $scope.idCategoryPost = data.idCategory;


            $http.get('/API/PostsAPI/')
                .success(function (data) {
                    angular.forEach(data, function (value, key) {
                        if (value.idCategory == $scope.idCategoryPost && value.idPost != $scope.idPost) {
                            $scope.relatedPosts.push(value);
                        };
                    });
                });
        });

    
}]);