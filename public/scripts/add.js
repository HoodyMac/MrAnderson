angular.module('mrAndersonApp').controller('AddSongCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.song = {};

  $scope.upload = function () {
    var fd = new FormData();
    fd.append('file', $scope.song.file);
    fd.append('artist', $scope.song.artist);
    fd.append('title', $scope.song.title);
    console.log($scope.song);
    $http.post('api/songs/upload', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function (response) {
      console.log(response);
    });
  };
}]);
