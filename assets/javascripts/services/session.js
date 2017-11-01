Psr.service('session', function ($http, configuration, $rootScope) {
    var _apiUrl = configuration.getApiUrl();
    var selectedRepEntity, person;
    var currentWeek = moment().isoWeek();
    var currentYear = moment().year();

    this.logIn = function (username, password) {
        return $http.post(_apiUrl + 'session.json', {
            session: {
                username: username,
                password: password
            }
        }, {withCredentials: true});
    };

    this.logOut = function () {
        setSessionData(null);
        return $http.get(_apiUrl + 'session/destroy.json', {withCredentials: true});
    };

    this.setSession = function (sessionData) {
        setSessionData(sessionData);
    };

    this.getSessionData = function () {
        return person;
    };

    function setSessionData(sessionData) {
        addTypeToReportingEntities(sessionData);
        person = sessionData;
        if (sessionData && sessionData.squads[0]) {
            selectedRepEntity = sessionData.squads[0];
            selectedRepEntity.type = 'Squad';
        }
        else {
            selectedRepEntity = null;
        }
        $rootScope.$broadcast('session-information-changed');
    }

    function addTypeToReportingEntities(sessionData) {
        if (!sessionData) {
            return;
        }
        for (var i = 0; i < sessionData.squads.length; i++) {
            sessionData.squads[i].type = 'Squad';
        }
        for (i = 0; i < sessionData.units.length; i++) {
            sessionData.units[i].type = 'Unit';
        }
    }

    this.getSelectedReportingEntity = function () {
        return selectedRepEntity;
    };

    this.setSelectedReportingEntity = function (repEntity) {
        selectedRepEntity = repEntity;
    };

    this.getNameAndSquads = function () {
        return $http.get(_apiUrl + 'session.json', {withCredentials: true});
    };

    this.getCurrentDate = function () {
        return {
            week: currentWeek,
            year: currentYear
        };
    };

    this.setCurrentDate = function (week, year) {
        currentWeek = week;
        currentYear = year;

        $rootScope.$broadcast('currentDateChanged');
    };
});
