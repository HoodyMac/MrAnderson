angular.module('mrAndersonApp').controller('MusicCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.songs = [];
  $http.get('api/songs/all').then(function (response) {
    $scope.songs = response.data;
    for(var i=0; i<$scope.songs.length; i++) {

      $scope.songs[i].url = "http://localhost:8080/api/files/" + $scope.songs[i].token;
    }
  });

  $scope.getSongUrl = function (name) {
    return "http://localhost:8080/api/files/" + name;
  };
}]);
