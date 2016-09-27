myApp.controller("themEmployeeController", function ($scope, $http, $window, $location, $filter, Url) {
    $scope.Employee = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.Employee.anh = fileUrl;
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


    //Lấy idEmployee từ Url
    $scope.currentIdEmployee = Url.getParameterByName('idEmployee');

    //Nếu sửa thì trả về giá trị của Employee
    if ($scope.currentIdEmployee) {
        $http.get('/API/EmployeesAPI/' + $scope.currentIdEmployee)
            .success(function (data) {
                $scope.Employee = {
                    idEmployee: data.idEmployee,
                    hoTen: data.hoTen,
                    chucVu: data.chucVu,
                    anh: data.anh,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu Employee
    $scope.saveEmployee = function () {
        if ($scope.currentIdEmployee) {
            $http.put('/API/EmployeeAPI/' + $scope.Employee.idEmployee, $scope.Employee)
            .success(function () {
                toastr.success('Thành công', 'Lưu nhân viên');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Nhân viên');
            });
        } else {
            $http.post('/API/EmployeeAPI/', $scope.Employee)
            .success(function () {
                toastr.success('Thành công', 'Thêm nhân viên');
                $window.location.href = '/Admin/Employees';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm nhân viên');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveEmployeeAndExit = function () {
        if ($scope.currentIdEmployee) {
            $http.put('/API/EmployeeAPI/' + $scope.Employee.idEmployee, $scope.Employee)
            .success(function () {
                $window.location.href = '/Admin/Employees';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu nhân viên');
            });
        } else {
            $http.post('/API/EmployeeAPI/', $scope.Employee)
            .success(function () {
                $window.location.href = '/Admin/Employees';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm nhân viên');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveEmployeeAndNew = function () {
        if ($scope.currentIdEmployee) {
            $http.put('/API/EmployeeAPI/' + $scope.Employee.idEmployee, $scope.Employee)
            .success(function () {
                $window.location.href = '/Admin/Employees/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu nhân viên')
            });
        } else {
            $http.post('/API/EmployeeAPI/', $scope.Employee)
            .success(function () {
                $window.location.href = '/Admin/Employees/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm nhân viên')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Employees';
    };
});