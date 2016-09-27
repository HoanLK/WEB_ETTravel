myApp.controller("themInfoUserController", function ($scope, $http, $window, $location, $filter, Url) {
    $scope.User = {};
    $scope.ChucVu = angular.element('#ChucVu').val();

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.User.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    function selectFileWithCKFinder(elementId) {
        var finder = new CKFinder();
        CKFinder.popup({
            chooseFiles: true,
            width: 200,
            height: 200,
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


    //Lấy idUser từ Url
    $scope.currentIdUser = Url.getParameterByName('UserId');

    //Trả về giá trị của User khi sửa
    if ($scope.currentIdUser) {
        $http.get('/API/UserAPI/' + $scope.currentIdUser)
            .success(function (data) {
                $scope.User = {
                    UserId: data.UserId,
                    Username: data.Username,
                    hoten: data.hoten,
                    sdt: data.sdt,
                    image: data.image,
                    chuvu: data.chuvu,
                };
            });
    }

    //Lưu User
    $scope.saveUser = function () {
        $scope.User.chuvu = $scope.ChucVu;
        $http.put('/API/UserAPI/' + $scope.User.UserId, $scope.User)
        .success(function () {
            toastr.success('Thành công', 'Lưu thông tin cá nhân');
            $window.location.href = '/Admin';
        })
        .error(function () {
            
            toastr.error('Thất bại', 'Thêm thông tin cá nhân')
        });
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin';
    };
});