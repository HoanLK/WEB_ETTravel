frontApp.controller("showProductController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
    $scope.product = {};
    $scope.relatedProducts = [];
    $scope.idCategoryProduct = "";
    $scope.idProduct = angular.element('#idProduct').val();

    $http.get('/API/ProductsAPI/' + $scope.idProduct)
        .success(function (data) {
            $scope.product = data;
            $scope.product.content = $sce.trustAsHtml(data.content)
            $scope.idCategoryProduct = data.idCategoryProduct;


            $http.get('/API/ProductsAPI/')
                .success(function (data) {
                    angular.forEach(data, function (value, key) {
                        if (value.idCategoryProduct == $scope.idCategoryProduct && value.idProduct != $scope.idProduct) {
                            $scope.relatedProducts.push(value);
                        };
                    });
                });
        });
}]);