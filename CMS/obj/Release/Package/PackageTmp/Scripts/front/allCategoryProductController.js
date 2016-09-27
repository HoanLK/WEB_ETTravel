frontApp.controller("allCategoryProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.categories = [];
    $scope.categoriesTrongNuoc = [];
    $scope.categoriesQuocTe = [];
    $scope.idCategory = angular.element('#idCategory').val();

    $http.get('/API/CategoryProductsAPI/'+$scope.idCategory)
        .success(function (data) {
            var categories = CategoryProduct.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == '34') {
                    $scope.categoriesTrongNuoc.push(value);
                }
            });
        })

    $http.get('/API/CategoryProductsAPI/' + $scope.idCategory)
        .success(function (data) {
            var categories = CategoryProduct.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == '35') {
                    $scope.categoriesQuocTe.push(value);
                }
            });
        })
}]);