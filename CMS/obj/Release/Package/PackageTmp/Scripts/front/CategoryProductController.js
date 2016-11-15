frontApp.controller("CategoryProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.categoriesTrongNuoc = [];
    $scope.categoriesQuocTe = [];


    $http.get('/API/CategoryProductsAPI/')
        .success(function (data) {
            var categories = CategoryProduct.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == 34) {
                    $scope.categoriesTrongNuoc.push(value);
                }
            });

            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == 35) {
                    $scope.categoriesQuocTe.push(value);
                }
            });
        })
}]);