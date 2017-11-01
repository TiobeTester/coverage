Psr.service('reportingEntity', function ($http, configuration) {
    var self = this;

    var _apiUrl = configuration.getApiUrl();

    self.staff = function (repEntity) {
        var url = 'api/squads/' + repEntity.id + '/staff.json';

        return $http.get(_apiUrl + url, {withCredentials: true});
    };
});
