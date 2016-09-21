myApp.controller("themPartnerController", function ($scope, $http, $window, $location, $filter, Url) {
    $scope.Partner = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.Partner.image = fileUrl;
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


    //Lấy idPartner từ Url
    $scope.currentIdPartner = Url.getParameterByName('idPartner');

    //Nếu sửa thì trả về giá trị của Partner
    if ($scope.currentIdPartner) {
        $http.get('/API/PartnerAPI/' + $scope.currentIdPartner)
            .success(function (data) {
                $scope.Partner = {
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


    //Lưu Partner
    $scope.savePartner = function () {
        if ($scope.currentIdPartner) {
            $http.put('/API/PartnerAPI/' + $scope.Partner.id, $scope.Partner)
            .success(function () {
                toastr.success('Thành công', 'Lưu đối tác');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm đối tác')
            });
        } else {
            $http.post('/API/PartnerAPI/', $scope.Partner)
            .success(function () {
                toastr.success('Thành công', 'Thêm đối tác');
                $window.location.href = '/Admin/Partners';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm đối tác');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.savePartnerAndExit = function () {
        if ($scope.currentIdPartner) {
            $http.put('/API/PartnerAPI/' + $scope.Partner.id, $scope.Partner)
            .success(function () {
                $window.location.href = '/Admin/Partners';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu đối tác');
            });
        } else {
            $http.post('/API/PartnerAPI/', $scope.Partner)
            .success(function () {
                $window.location.href = '/Admin/Partners';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm đối tác');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.savePartnerAndNew = function () {
        if ($scope.currentIdPartner) {
            $http.put('/API/PartnerAPI/' + $scope.Partner.id, $scope.Partner)
            .success(function () {
                $window.location.href = '/Admin/Partners/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu đối tác')
            });
        } else {
            $http.post('/API/PartnerAPI/', $scope.Partner)
            .success(function () {
                $window.location.href = '/Admin/Partners/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm đối tác')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Partners';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.Partner.alias = Alias.genAlias($scope.Partner.title);
    };
});