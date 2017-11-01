Psr.controller('LightboxCtrl', function ($scope, $mdDialog, image, title) {
    $scope.image = image;
    $scope.title = title;

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
});
