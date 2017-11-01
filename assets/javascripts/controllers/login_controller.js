Psr.controller('LoginCtrl', function ($scope, $mdDialog, session) {
    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.logIn = function () {
        session.logIn($scope.username, $scope.password).then(function (response) {
            $mdDialog.hide();

            session.setSession(response.data);
        }).catch(function () {
            $scope.loginFailed = true;
        });
    };
});
