myApp.controller("themOrderController", function ($scope, $http, $window, $location, $filter, Url) {
    $scope.Order = {};

    //Lấy idOrder từ Url
    $scope.currentIdOrder = Url.getParameterByName('idOrder');

    //Nếu sửa thì trả về giá trị của Order
    if ($scope.currentIdOrder) {
        $http.get('/API/OrderAPI/' + $scope.currentIdOrder)
            .success(function (data) {
                $scope.Order = {
                    idOrder: data.idOrder,
                    hoTen: data.hoTen,
                    diaChi: data.diaChi,
                    SDT: data.SDT,
                    email: data.email,
                    tour: data.tour,
                    timeStart: data.timeStart,
                    guestNumber: data.guestNumber,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu Order
    $scope.saveOrder = function () {
        if ($scope.currentIdOrder) {
            $http.put('/API/OrderAPI/' + $scope.Order.idOrder, $scope.Order)
            .success(function () {
                toastr.success('Thành công', 'Lưu Order');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Order')
            });
        } else {
            $http.post('/API/OrderAPI/', $scope.Order)
            .success(function () {
                toastr.success('Thành công', 'Thêm Order');
                $window.location.href = '/Admin/Orders';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Order');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveOrderAndExit = function () {
        if ($scope.currentIdOrder) {
            $http.put('/API/OrderAPI/' + $scope.Order.idOrder, $scope.Order)
            .success(function () {
                $window.location.href = '/Admin/Orders';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Order');
            });
        } else {
            $http.post('/API/OrderAPI/', $scope.Order)
            .success(function () {
                $window.location.href = '/Admin/Orders';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Order');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveOrderAndNew = function () {
        if ($scope.currentIdOrder) {
            $http.put('/API/OrderAPI/' + $scope.Order.idOrder, $scope.Order)
            .success(function () {
                $window.location.href = '/Admin/Orders/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Order')
            });
        } else {
            $http.post('/API/OrderAPI/', $scope.Order)
            .success(function () {
                $window.location.href = '/Admin/Orders/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Order')
            });
        }
    };

    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Orders';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.Order.alias = Alias.genAlias($scope.Order.title);
    };
});