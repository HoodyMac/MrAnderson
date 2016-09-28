angular.module('mrAndersonApp').controller('AddSongModalCtrl', function($scope, $http, close) {
  $scope.song = {};
  $scope.file = {};

  $scope.upload = function () {
    var fd = new FormData();
    fd.append('file', $scope.file);
    fd.append('artist', $scope.song.artist);
    fd.append('title', $scope.song.title);
    $http.post('api/songs/upload', fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    }).then(function (response) {
      closeModal(response.data);
    });
  };

  $scope.close = function () {
    closeModal(undefined);
  };

  function closeModal(data) {
    close(data, 500);
  }
});
