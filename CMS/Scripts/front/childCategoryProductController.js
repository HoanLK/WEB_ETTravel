frontApp.controller("childCategoryProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.categories = [];
    $scope.products = [];
    $scope.idCategory = angular.element('#idCategory').val();


    $http.get('/API/CategoryProductsAPI/')
        .success(function (data) {
            var categories = CategoryProduct.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == $scope.idCategory) {
                    $scope.categories.push(value);
                }
            });
        })
    $http.get('/API/ProductsAPI/')
        .success(function (data) {
            angular.forEach(data, function (value, key) {
                
                if (value.idCategoryProduct == $scope.idCategory) {
                    $scope.products.push(value);
                }
            });
        });
}]);