angular.module('mrAndersonApp').controller('SignUpModalCtrl', function($scope, $http, close) {
    $scope.user = {};

    $scope.signUp = function () {
        $http.post('api/users', $scope.user).then(function (response) {
            $http.post('api/login', $scope.user).then(function (responseLogin) {
                localStorage.setItem('jwt', responseLogin.headers()['x-auth-token']);
                closeModal();
            })
        });
    };

    $scope.close = function () {
        closeModal(undefined);
    };

    function closeModal(data) {
        close(data, 500);
    }
});
