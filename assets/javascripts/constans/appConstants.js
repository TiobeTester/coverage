(function () {
    'use strict';

    Psr.constant('GLOBALS', {
        appName: 'Squad Status Reporting',
        appVersion: '',
        appEnvironments: {
            development: 'http://localhost:3000/',
            production: 'http://odie.ddns.htc.nl.philips.com//',
            staging: 'http://garfield.spssvr1.htce.nl.philips.com/',
            demo: 'http://garfield.spssvr1.htce.nl.philips.com/',
            local: 'http://192.168.34.12/'
        },
        appDefaultReportingEntity: 'Squads'
    });
})();
