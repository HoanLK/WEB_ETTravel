myApp.controller("themHotelController", function ($scope, $http, $window, $location, $filter, Url) {
    $scope.Hotel = {};

    //Lấy idOrder từ Url
    $scope.currentIdHotel = Url.getParameterByName('idHotel');

    //Nếu sửa thì trả về giá trị của Order
    if ($scope.currentIdOrder) {
        $http.get('/API/HotelAPI/' + $scope.currentIdHotel)
            .success(function (data) {
                $scope.Hotel = {
                    idHotel: data.idHotel,
                    hoTen: data.hoTen,
                    diaChi: data.diaChi,
                    SDT: data.SDT,
                    email: data.email,
                    hotel: data.hotel,
                    timeStart: data.timeStart,
                    timeEnd:data.timeEnd,
                    guestNumber: data.guestNumber,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu Hotel
    $scope.saveHotel = function () {
        if ($scope.currentIdHotel) {
            $http.put('/API/HotelAPI/' + $scope.Hotel.idHotel, $scope.Hotel)
            .success(function () {
                toastr.success('Thành công', 'Lưu Hotel');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Hotel')
            });
        } else {
            $http.post('/API/HotelAPI/', $scope.Hotel)
            .success(function () {
                toastr.success('Thành công', 'Thêm Hotel');
                $window.location.href = '/Admin/Hotels';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Hotel');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveHotelAndExit = function () {
        if ($scope.currentIdHotel) {
            $http.put('/API/HotelAPI/' + $scope.Hotel.idHotel, $scope.Hotel)
            .success(function () {
                $window.location.href = '/Admin/Hotels';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Hotel');
            });
        } else {
            $http.post('/API/HotelAPI/', $scope.Hotel)
            .success(function () {
                $window.location.href = '/Admin/Hotels';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Hotel');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveHotelAndNew = function () {
        if ($scope.currentIdHotel) {
            $http.put('/API/HotelAPI/' + $scope.Hotel.idHotel, $scope.Hotel)
            .success(function () {
                $window.location.href = '/Admin/Hotels/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Hotel')
            });
        } else {
            $http.post('/API/HotelAPI/', $scope.Hotel)
            .success(function () {
                $window.location.href = '/Admin/Hotels/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Hotel')
            });
        }
    };

    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Hotels';
    };
});