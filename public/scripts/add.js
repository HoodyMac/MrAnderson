angular.module('mrAndersonApp').controller('AddSongCtrl', ['$scope', function($scope) {
  $scope.song = {};

  $scope.upload = function () {
    console.log($scope.song);
  }
}]);
