frontApp.controller("themKhachSanController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.KhachSan = {};
    $scope.idKhachSan = angular.element('#idKhachSanCurrent').val();

    //INIT
    Init();

    //Lưu Order
    $scope.SaveKhachSan = function () {
        $scope.KhachSan.checked = 0;
        $http.post('/API/hotelAPI', $scope.KhachSan)
        .success(function () {
            toastr.success('Thành công', 'Đặt phòng khách sạn');
        })
        .error(function () {
            toastr.error('Thất bại', 'Đặt phòng khách sạn');
            console.log($scope.KhachSan)
        });
    }

    function Init() {
        $http.get('/API/ProductsAPI/' + $scope.idKhachSan)
            .success(function (product) {
                $scope.KhachSan.hotel = product.title;
                //$scope.KhachSan.timeStart = product.timeStart;
            })
    }
}]);