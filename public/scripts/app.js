var mrAnderson = angular.module('mrAndersonApp', ['ngRoute', 'ngAnimate', 'angularSoundManager', 'angularModalService']);

mrAnderson.config(function($routeProvider) {
  $routeProvider.when('/music', {
    templateUrl: 'music.html',
    controller: 'MusicCtrl'
  }).when('/add', {
    templateUrl: 'add.html',
    controller: 'AddSongCtrl'
  }).when('/egg', {
    templateUrl: 'egg.html'
  }).otherwise({
    redirectTo: '/music'
  })
})

mrAnderson.run(function($rootScope, $location, ModalService) {
    $rootScope.search = function (text) {
      $location.path('/music').search('search', text);
    };

    $rootScope.addSong = function () {
      ModalService.showModal({
        templateUrl: 'add.html',
        controller: 'AddSongCtrl'
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          $rootScope.$emit('songAddedEvent', result);
        });
      });
    }
});

mrAnderson.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
