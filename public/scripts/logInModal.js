angular.module('mrAndersonApp').controller('LogInModalCtrl', function($scope, $http, close) {
    $scope.user = {};

    $scope.logIn = function () {
        $http.post('api/login', $scope.user).then(function (response) {
            localStorage.setItem('jwt', response.headers()['x-auth-token']);
            closeModal();
        });
    };

    $scope.close = function () {
        closeModal(undefined);
    };

    function closeModal(data) {
        close(data, 500);
    }
});
