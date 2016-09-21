frontApp.controller("themorderController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.order = {};
    $scope.idProduct = angular.element('#idProductCurrent').val();

    //INIT
    Init();

    //Lưu Order
    $scope.SaveOrder = function () {
        $scope.order.checked = 0;
        $http.post('/API/OrderAPI/', $scope.order)
        .success(function () {
            toastr.success('Thành công', 'Đăng ký tour');
        })
        .error(function () {
            toastr.error('Thất bại', 'Đăng ký tour');
        });
    }

    function Init() {
        $http.get('/API/ProductsAPI/' + $scope.idProduct)
            .success(function (product) {
                $scope.order.tour = product.title;
                $scope.order.timeStart = product.timeStart;
            })
    }
}]);