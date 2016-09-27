frontApp.controller("PartnerController", ['$scope', '$http', '$window',function ($scope, $http, $window) {

    $scope.Partners = [];
    
    $http.get('/API/PartnerAPI/')
        .success(function (data) {
            $scope.Partners = data;
            
        })
}]);