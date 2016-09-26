var mrAnderson = angular.module('mrAndersonApp', ['ngRoute']);

mrAnderson.config(function($routeProvider) {
  $routeProvider.when('/music', {
    templateUrl: 'music.html',
    controller: 'MusicCtrl'
  }).otherwise({
    redirectTo: '/music'
  })
})
