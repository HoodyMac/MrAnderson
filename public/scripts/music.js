angular.module('mrAndersonApp').controller('MusicCtrl', function($scope, $http, $routeParams) {
  $scope.songs = [];
  var search = $routeParams['search'];
  if (angular.isDefined(search)) {
    $http.get('api/search/' + search).then(function (response) {
      $scope.songs = response.data;

      for(var i=0; i<$scope.songs.length; i++) {

        $scope.songs[i].url = "http://localhost:8080/api/files/" + $scope.songs[i].token;
      }
    });
  } else {
    $http.get('api/songs/all').then(function (response) {
      $scope.songs = response.data;
      for(var i=0; i<$scope.songs.length; i++) {

        $scope.songs[i].url = "http://localhost:8080/api/files/" + $scope.songs[i].token;
      }
    });
  }

  $scope.getSongUrl = function (name) {
    return "http://localhost:8080/api/files/" + name;
  };
});
