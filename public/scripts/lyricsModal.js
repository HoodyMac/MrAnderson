angular.module('mrAndersonApp').controller('lyricsModalCtrl', function ($scope, close, lyrics) {
    $scope.lyrics = lyrics;

    $scope.close = function () {
        close(undefined, 500);
    };
});
