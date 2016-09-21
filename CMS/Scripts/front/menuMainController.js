frontApp.controller("menuMainController", ['$scope', '$http', '$window', 'CategoryPost', 'CategoryProduct', function ($scope, $http, $window, CategoryPost, CategoryProduct) {
    $scope.desSanPham = [];
    $scope.desBaoDuongXe = [];
    $scope.desLaiXeAnToan = [];
    $scope.desDaiLy = [];
    $scope.listSanPham = [];
    $scope.listSanPham2 = [];
    $scope.listBaoDuongXe = [];
    $scope.listLaiXeAnToan = [];
    $scope.listDaiLy = [];

    
    //Menu san pham
    $http.get('/API/CategoryProductsAPI/')
        .success(function (data) {
            var categories = CategoryProduct.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.alias == "dau-nhot-o-to" ||
                    value.alias == "dau-nhot-xe-tai" ||
                    value.alias == "dau-nhot-cong-nghiep") {
                    $scope.listSanPham.push(value);
                };
            });
        });
    $http.get('/API/ProductsAPI/')
        .success(function (data) {
            angular.forEach(data, function (value, key) {
                if (value.feature == 1) {
                    $scope.desSanPham.push(value);
                }
            })
        });

    //Menu Bao duong xe
    $http.get('/API/CategoriesAPI/')
        .success(function (data) {
            var categories = CategoryPost.getallCategory(data);
            angular.forEach(categories, function (value, key) {
                if (value.alias == "khuyen-mai" ||
                    value.alias == "bao-hanh" ||
                    value.alias == "cau-hoi-thuong-gap") {
                    $scope.listSanPham2.push(value);
                };
                //listBaoDuongXe
                if (value.idCategoryParent == '141') {
                    $scope.listBaoDuongXe.push(value);
                }
                //listLaiXeAnToan
                if (value.idCategoryParent == '142') {
                    $scope.listLaiXeAnToan.push(value);
                }
                //listDaiLy
                if (value.idCategoryParent == "143") {
                    $scope.listDaiLy.push(value);
                }
            });
        });
    $http.get('/API/PostsAPI/')
        .success(function (data) {
            angular.forEach(data, function (value, key) {

                if (value.idCategory == "141" && value.featured == "1") {
                    $scope.desBaoDuongXe.push(value);
                }
                if (value.idCategory == "142" && value.featured == "1") {
                    $scope.desLaiXeAnToan.push(value);
                }
                if (value.idCategory == "143" && value.featured == "1") {
                    $scope.desDaiLy.push(value);
                }
            });
        });
}]);