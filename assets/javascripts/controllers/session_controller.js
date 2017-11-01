Psr.controller('SessionCtrl', function ($mdDialog, $scope, session) {
    session.getNameAndSquads().then(function (response) {
        session.setSession(response.data);
    }).catch(function () {
        session.setSession(null);
    });

    $scope.logOut = function () {
        session.logOut();
    };

    $scope.$on('session-information-changed', function () {
        $scope.person = session.getSessionData();
    });

    $scope.showLoginDialog = function ($event) {
        $mdDialog.show({
            controller: 'LoginCtrl',
            targetEvent: $event,
            templateUrl: 'views/application/_login.html'
        });
    };
});
