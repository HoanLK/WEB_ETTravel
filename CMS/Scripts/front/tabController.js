frontApp.controller("tabController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.categoryTrongNuocs = [];
    $scope.categoryTrongNuoc = {};
    $scope.productTrongNuocs = [];

    $scope.categoryQuocTes = [];
    $scope.categoryQuocTe = {};
    $scope.productQuocTes = [];


    //INIT
    Init();

    //Chọn Category Trong nước
    $scope.ChonCategoryTrongNuoc = function (categoryTrongNuoc) {
        $scope.categoryTrongNuoc = categoryTrongNuoc;
        $http.get('/Product/GetByCategory/' + $scope.categoryTrongNuoc.idCategory)
            .success(function (productTrongNuocs) {
                $scope.productTrongNuocs = productTrongNuocs;
            })
    }

    //Chọn Category quốc tế
    $scope.ChonCategoryQuocTe = function (categoryQuocTe) {
        $scope.categoryQuocTe = categoryQuocTe;
        $http.get('/Product/GetByCategory/' + $scope.categoryQuocTe.idCategory)
            .success(function (productQuocTes) {
                $scope.productQuocTes = productQuocTes;
            })
    }
    

    //FUNCTION
    /*
     * INIT()
     * Đây là hàm khởi tạo khi mới vào trang
     */
    function Init() {
        //Load tất cả các Categories Du lịch trong nước
        $http.get('/CategoryProduct/GetCategoryTrongNuoc/')
        .success(function (categoryTrongNuocs) {
            $scope.categoryTrongNuocs = categoryTrongNuocs;
            //Để category mặc định là cái đầu tiên 
            $scope.categoryTrongNuoc = $scope.categoryTrongNuocs[0];
            $scope.ChonCategoryTrongNuoc($scope.categoryTrongNuoc);
            console.log($scope.categoryTrongNuoc)
        })

        $http.get('/CategoryProduct/GetCategoryQuocTe/')
        .success(function (categoryQuocTes) {
            $scope.categoryQuocTes = categoryQuocTes;
            //Để category mặc định là cái đầu tiên 
            $scope.categoryQuocTe = $scope.categoryQuocTes[0];
            $scope.ChonCategoryQuocTe($scope.categoryQuocTe);
            console.log($scope.$scope.categoryQuocTe)
        })
    }
}]);