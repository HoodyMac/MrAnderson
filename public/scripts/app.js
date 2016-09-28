var mrAnderson = angular.module('mrAndersonApp', ['ngRoute', 'ngAnimate', 'angularSoundManager', 'angularModalService']);

mrAnderson.config(function($routeProvider) {
  $routeProvider.when('/music', {
    templateUrl: 'myMusic.html',
    controller: 'MyMusicCtrl'
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
        templateUrl: 'addSongModal.html',
        controller: 'AddSongModalCtrl'
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if (angular.isDefined(result)) {
            $rootScope.$emit('songAddedEvent', result);
          }
        });
      });
    }
});

mrAnderson.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
