frontApp.controller("EmployeeController", ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.Employees = [];
    
    $http.get('/API/EmployeeAPI/')
        .success(function (data) {
            $scope.Employees = data;
        })
}]);