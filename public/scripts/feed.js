angular.module('mrAndersonApp').controller('FeedCtrl', function ($scope, $http, $rootScope) {
    $scope.songs = [];

    $http.get('api/users/feed', $scope.songs).then(function(data){
        $scope.songs = data.data;
    })
});