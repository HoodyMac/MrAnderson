angular.module('mrAndersonApp').controller('MyMusicCtrl', function($scope, $http, $routeParams, $rootScope, ModalService) {
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

  $scope.edit = function (song) {
    ModalService.showModal({
      templateUrl: 'editSongModal.html',
      controller: 'EditSongModalCtrl',
      inputs: {
        song: jQuery.extend({}, song)
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function (result) {
        if (angular.isDefined(result)) {
          result.url = "/api/files/" + result.token;
          song = result;
        }
      });
    });
  };

  $scope.hoverIn = function() {
    this.hoverEdit = true;
  };

  $scope.hoverOut = function() {
    this.hoverEdit = false;
  };
});
