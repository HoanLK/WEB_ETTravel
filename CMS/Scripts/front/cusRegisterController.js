frontApp.controller("cusRegisterController", ['$scope', '$http', '$window', '$sce',function ($scope, $http, $window, $sce) {
    $scope.cusRegiste = {};

    $scope.registe = function () {
        $http.get('/API/CustomerRegistersAPI/')
        .success(function (data) {
            var count = 0;
            angular.forEach(data, function (value, key) {
                if (value.email == $scope.cusRegiste.email) {
                    count++;
                    alert("Email đã được đăng ký");
                    $scope.cusRegiste.email = "";
                };
            });
            if (count == 0) {
                if ($scope.cusRegiste.email == null) {
                    alert("Vui lòng nhập email");
                }
                else{
                    $http.post('/API/CustomerRegistersAPI/', $scope.cusRegiste)
                        .success(function (data) {
                            alert("Đăng ký thành công");
                            $scope.cusRegiste.email = "";
                        });
                }
            }
        });

        
    };

}]);