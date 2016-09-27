frontApp.controller("CustomerController", ['$scope', '$http', '$window',function ($scope, $http, $window) {

    $scope.Customers = [];
    
    $http.get('/API/CustomerAPI/')
        .success(function (data) {
            $scope.Customers = data;
            
        })
}]);