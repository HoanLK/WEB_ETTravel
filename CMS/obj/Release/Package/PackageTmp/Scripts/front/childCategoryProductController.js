frontApp.controller("childCategoryProductController", ['$scope', '$http', '$window', 'CategoryProduct', function ($scope, $http, $window, CategoryProduct) {
    $scope.categories = [];
    $scope.products = [];
    $scope.idCategory = angular.element('#idCategory').val();
    $scope.Posts = [];


    $http.get('/API/CategoryProductsAPI/')
        .success(function (data) {
            var categories = CategoryProduct.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.idCategoryParent == $scope.idCategory) {
                    $scope.categories.push(value);
                }
            });
        })
    $http.get('/API/ProductsAPI?att=idCategoryProduct&&value='+$scope.idCategory)
        .success(function (products) {
            $scope.products = products;
        });

    //Lấy bài viết theo tên tour
    $http.get('/admin/posts/GetByCategoryTour/' + $scope.idCategory)
        .success(function (data) {
            $scope.Posts = data;
        })
}]);