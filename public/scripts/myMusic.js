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
    data.url = "/api/files/" + data.token;
    $scope.songs.push(data);
  });

  $scope.edit = function (song) {
    ModalService.showModal({
      templateUrl: 'views/editSongModal.html',
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

   $scope.delete = function(song){
                                   $http.delete('api/songs/delete/' + song.id).then(function(response){
                                  var index = $scope.songs.indexOf(song);
                                  $scope.songs.splice(index, 1);
                                   })
                              };

  $scope.showLyrics = function (song) {
      $http.get('../resources/key.json').then(function (response) {
        var apiKey = response.data.key;
        $http.jsonp('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=JSON_CALLBACK&q_track='
            +  song.title + '&q_artist=' + song.artist + '&apikey=' + apiKey, {jsonpCallbackParam: 'callback'})
            .then(function (responseLyrics) {
            ModalService.showModal({
                templateUrl: 'views/lyricsModal.html',
                controller: 'lyricsModalCtrl',
                inputs: {
                    lyrics: responseLyrics.data.message.body.lyrics.lyrics_body
                }
            }).then(function(modal) {
                modal.element.modal();
            });
        })
      });
  };

  $scope.hoverIn = function() {
    this.hoverEdit = true;
  };

  $scope.hoverOut = function() {
    this.hoverEdit = false;
  };
});
