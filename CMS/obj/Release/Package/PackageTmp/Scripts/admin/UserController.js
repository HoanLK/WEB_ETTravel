frontApp.controller("UserController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.Users = [];

    $http.get('/API/UserAPI/')
        .success(function (data) {
            $scope.Users = data;
        })
}]);