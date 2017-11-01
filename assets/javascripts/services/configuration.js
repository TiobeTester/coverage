Psr.service('configuration', function (GLOBALS) {
    var _environment = 'ENVIRONMENT';

    var _environments = {
        development: GLOBALS.appEnvironments.development,
        production: GLOBALS.appEnvironments.production,
        staging: GLOBALS.appEnvironments.staging,
        demo: GLOBALS.appEnvironments.demo,
        local: GLOBALS.appEnvironments.local
    };

    this.getApiUrl = function () {
        return _environments[this.getEnvironment()];
    };

    this.getEnvironment = function () {
        return _environment;
    };
});
