frontApp.controller("showProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.product = {};
    $scope.products = [];
    $scope.idCategoryProduct;
    $scope.idProduct = angular.element('#idPost').val();
    $scope.idCategory = angular.element('#idCategory').val();
    $scope.category = [];

    $http.get('/API/ProductsAPI/' + $scope.idProduct)
        .success(function (data) {
            $scope.product = data;
            $scope.idCategoryProduct = data.idCategoryProduct;
            //console.log($scope.product);

            $http.get('/API/ProductsAPI/')
                .success(function (data) {
                    angular.forEach(data, function (value, key) {
                        if (value.idCategoryProduct == $scope.idCategoryProduct && value.idProduct != $scope.idProduct) {
                            $scope.products.push(value);
                        };
                    });
                });
        });

    $http.get('API/CategoriesAPI/151')
        .success(function (data) {
            $scope.category = data;
            console.log($scope.category);
        }
    )}]);