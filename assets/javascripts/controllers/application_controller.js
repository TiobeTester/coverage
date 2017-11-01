Psr.controller('ApplicationCtrl', function ($scope, $rootScope, time, configuration, GLOBALS) {
    $scope.environment = configuration.getEnvironment();

    $scope.showConfig = function () {
        console.info('environment: ' + configuration.getEnvironment());
        console.info('API-url: ' + configuration.getApiUrl());
    };

    $scope.utcToLocal = time.utcToLocal;

    $scope.handlePaste = function (e) {
        $rootScope.$broadcast('paste-clipboard', e);
    };

    $scope.appName = GLOBALS.appName;
});
