angular.module('mrAndersonApp').controller('UserCtrl', function ($scope, $http, $rootScope) {
$scope.users = [];

    $http.get('api/users/allUsers', $scope.users).then(function(data){
        $scope.users = data.data;
    })

    $scope.follow = function(id){
        $http.post('api/users/follow/' + id).then(function(response){
        })
    };

});