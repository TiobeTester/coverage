Psr.service('metrics', function ($http, configuration) {
    var self = this;

    var _apiUrl = configuration.getApiUrl();

    self.show = function (id, repEntity) {
        var url = 'api/psr/metrics/' + id + '.json';
        if (repEntity) {
            url = url + '?' + repEntity.type.toLowerCase() + '_id=' + repEntity.id;
        }

        return $http.get(_apiUrl + url, {withCredentials: true});
    };
});
