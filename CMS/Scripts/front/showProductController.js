frontApp.controller("showProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.product = {};
    $scope.products = [];
    $scope.idCategoryProduct;
    $scope.idProduct = angular.element('#idCategory').val();

    $http.get('/API/ProductsAPI/' + $scope.idProduct)
        .success(function (data) {
            $scope.product = data;
            $scope.idCategoryProduct = data.idCategoryProduct;
            console.log($scope.product);

            $http.get('/API/ProductsAPI/')
                .success(function (data) {
                    angular.forEach(data, function (value, key) {
                        if (value.idCategoryProduct == $scope.idCategoryProduct && value.idProduct != $scope.idProduct) {
                            $scope.products.push(value);
                        };
                    });
                });
        });
}]);