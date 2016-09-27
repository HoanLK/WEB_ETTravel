myApp.controller("themCustomerController", function ($scope, $http, $window, $location, $filter, Url) {
    $scope.Customer = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.Customer.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    function selectFileWithCKFinder(elementId) {
        var finder = new CKFinder();
        CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
                alert("Yes");
                finder.on('files:choose', function (evt) {
                    var file = evt.data.files.first();
                    elementId = file.getUrl();
                });

                finder.on('file:choose:resizedImage', function (evt) {
                    elementId = evt.data.resizedUrl;
                });
            }
        });
    }


    //Lấy idCustomer từ Url
    $scope.currentIdCustomer = Url.getParameterByName('idCustomer');

    //Nếu sửa thì trả về giá trị của Customer
    if ($scope.currentIdCustomer) {
        $http.get('/API/CustomerAPI/' + $scope.currentIdCustomer)
            .success(function (data) {
                $scope.Customer = {
                    id: data.id,
                    title: data.title,
                    image: data.image,
                    link: data.link,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu Customer
    $scope.saveCustomer = function () {
        if ($scope.currentIdCustomer) {
            $http.put('/API/CustomerAPI/' + $scope.Customer.id, $scope.Customer)
            .success(function () {
                toastr.success('Thành công', 'Lưu khách hàng');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm khách hàng')
            });
        } else {
            $http.post('/API/CustomerAPI/', $scope.Customer)
            .success(function () {
                toastr.success('Thành công', 'Thêm khách hàng');
                $window.location.href = '/Admin/Customers';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm khách hàng');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveCustomerAndExit = function () {
        if ($scope.currentIdCustomer) {
            $http.put('/API/CustomerAPI/' + $scope.Customer.id, $scope.Customer)
            .success(function () {
                $window.location.href = '/Admin/Customers';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu khách hàng');
            });
        } else {
            $http.post('/API/CustomerAPI/', $scope.Customer)
            .success(function () {
                $window.location.href = '/Admin/Customers';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm khách hàng');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveCustomerAndNew = function () {
        if ($scope.currentIdCustomer) {
            $http.put('/API/CustomerAPI/' + $scope.Customer.id, $scope.Customer)
            .success(function () {
                $window.location.href = '/Admin/Customers/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu khách hàng')
            });
        } else {
            $http.post('/API/CustomerAPI/', $scope.Customer)
            .success(function () {
                $window.location.href = '/Admin/Customers/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm khách hàng')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Customers';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.Customer.alias = Alias.genAlias($scope.Customer.title);
    };
});