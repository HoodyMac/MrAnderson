var mrAnderson = angular.module('mrAndersonApp', ['ngRoute', 'angularSoundManager']);

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

mrAnderson.run(function($rootScope, $location) {
    $rootScope.search = function (text) {
      $location.path('/music').search('search', text);
    }
});

mrAnderson.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
