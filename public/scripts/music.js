angular.module('mrAndersonApp').controller('MusicCtrl', function($scope, $http, $routeParams, $rootScope) {
  $scope.songs = [];
  var search = $routeParams['search'];
  if (angular.isDefined(search) && search !== "") {
    $http.get('api/search/' + search).then(function (response) {
      $scope.songs = response.data;
      for(var i=0; i<$scope.songs.length; i++) {
        $scope.songs[i].url = "/api/files/" + $scope.songs[i].token;
      }
    });
  } else {
    $http.get('api/songs/all').then(function (response) {
      $scope.songs = response.data;
      for(var i=0; i<$scope.songs.length; i++) {
        $scope.songs[i].url = "/api/files/" + $scope.songs[i].token;
      }
    });
  }

  $rootScope.$on('songAddedEvent', function (event, data) {
    data.url = "/api/files/" + data.token
    $scope.songs.push(data);
  });
});
