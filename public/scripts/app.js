var mrAnderson = angular.module('mrAndersonApp', ['ngRoute', 'ngAnimate', 'angularSoundManager', 'angularModalService']);

mrAnderson.config(function ($routeProvider, $httpProvider) {
    $routeProvider.when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MyMusicCtrl'
    }).when('/egg', {
        templateUrl: 'views/egg.html'
    }).when('/users', {
        templateUrl: 'views/userList.html',
        controller: 'UserCtrl'
    }).when('/feed', {
        templateUrl: 'views/home.html',
        controller: 'FeedCtrl'
    })
    .otherwise({
        redirectTo: '/music'
    });

    $httpProvider.interceptors.push('httpRequestInterceptor');
});

mrAnderson.run(function ($rootScope, $location, ModalService, $http) {
    $rootScope.searchText = '';
    $rootScope.me = {};
    $rootScope.isSignedIn = false;

    getUser();

    $rootScope.search = function (text) {
        $rootScope.searchText = text;
        $location.path('/music').search('search', text);
    };

    $rootScope.addSong = function () {
        ModalService.showModal({
            templateUrl: 'views/addSongModal.html',
            controller: 'AddSongModalCtrl'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                if (angular.isDefined(result)) {
                    $rootScope.$emit('songAddedEvent', result);
                }
            });
        });
    };

    $rootScope.signUp = function () {
        ModalService.showModal({
            templateUrl: 'views/signUpModal.html',
            controller: 'SignUpModalCtrl'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                getUser();
            });
        });
    };

    $rootScope.logIn = function () {
        ModalService.showModal({
            templateUrl: 'views/logInModal.html',
            controller: 'LogInModalCtrl'
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                getUser();
            });
        });
    };

    $rootScope.logOut = function () {
        $rootScope.isSignedIn = false;
        localStorage.removeItem('jwt');
    };

    function getUser() {
        if (localStorage.getItem('jwt') === null) {
            return;
        }
        $http.get('api/users/me').then(function (response) {
            $rootScope.me = response.data;
            $rootScope.isSignedIn = true;
        }, function (response) {
            localStorage.removeItem('jwt');
            $rootScope.isSignedIn = false;
        })
    }
});

mrAnderson.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

mrAnderson.factory('httpRequestInterceptor', function () {
    return {
        request: function (config) {
            var token = localStorage.getItem('jwt');
            if (token === null) {
                token = '';
            }
            config.headers['x-auth-token'] = token;
            return config;
        }
    };
});
