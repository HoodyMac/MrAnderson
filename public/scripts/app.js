var mrAnderson = angular.module('mrAndersonApp', ['ngRoute']);

mrAnderson.config(function($routeProvider) {
  $routeProvider.when('/music', {
    templateUrl: 'music.html',
    controller: 'MusicCtrl'
  }).when('/add', {
    templateUrl: 'add.html',
    controller: 'AddSongCtrl'
  }).otherwise({
    redirectTo: '/music'
  })
})
