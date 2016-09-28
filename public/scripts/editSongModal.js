angular.module('mrAndersonApp').controller('EditSongModalCtrl', function($scope, $http, close, song) {
  $scope.song = song;

  $scope.save = function () {
    $http.put('api/songs/edit/' + $scope.song.id, $scope.song).then(function (response) {
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
