angular.module('mrAndersonApp').controller('MusicCtrl', ['$scope', '$http', function($scope, $http) {
  // $scope.songs = [
  //   {
  //     author: "Qwerty",
  //     name: "1",
  //     // file: "https://cs9-3v4.vk.me/p17/636d18417c0690.mp3?extra=sxtTuwRf9gYEIDvZPSsTt1Gy0c_vpYwK9BtoG5wqsP40mGQXyhLPKgdofIP7cn8bU2CSwGccp3bZVAuYtpOs_fp1SOY_74FntmmNjCnCLO62qnSreYVXzPpwcFjL1ukU7lSZONOfp_lC"
  //   },
  //   {
  //     author: "Ytrewq",
  //     name: "2",
  //     // file: "https://cs9-3v4.vk.me/p17/636d18417c0690.mp3?extra=sxtTuwRf9gYEIDvZPSsTt1Gy0c_vpYwK9BtoG5wqsP40mGQXyhLPKgdofIP7cn8bU2CSwGccp3bZVAuYtpOs_fp1SOY_74FntmmNjCnCLO62qnSreYVXzPpwcFjL1ukU7lSZONOfp_lC"
  //   },
  //   {
  //     author: "Asdf",
  //     name: "3",
  //     // file: "https://cs9-3v4.vk.me/p17/636d18417c0690.mp3?extra=sxtTuwRf9gYEIDvZPSsTt1Gy0c_vpYwK9BtoG5wqsP40mGQXyhLPKgdofIP7cn8bU2CSwGccp3bZVAuYtpOs_fp1SOY_74FntmmNjCnCLO62qnSreYVXzPpwcFjL1ukU7lSZONOfp_lC"
  //   },
  //   {
  //     author: "Fdsa",
  //     name: "4",
  //     // file: "https://cs9-3v4.vk.me/p17/636d18417c0690.mp3?extra=sxtTuwRf9gYEIDvZPSsTt1Gy0c_vpYwK9BtoG5wqsP40mGQXyhLPKgdofIP7cn8bU2CSwGccp3bZVAuYtpOs_fp1SOY_74FntmmNjCnCLO62qnSreYVXzPpwcFjL1ukU7lSZONOfp_lC"
  //   },
  //   {
  //     author: "Zxcv",
  //     name: "5",
  //     file: "http://localhost:8080/api/files/8be79e952df632ed957b4e7ca52efbb1.mp3"
  //   }
  // ];
  $scope.songs = [];
  $http.get('api/songs/all').then(function (response) {
    $scope.songs = response.data;
  });

  $scope.getSongUrl = function (name) {
    return "http://localhost:8080/api/files/" + name;
  };
}]);
