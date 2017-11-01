Psr.service('scores', function ($http, configuration) {
    var _apiUrl = configuration.getApiUrl();

    this.getSquadScores = function (date) {
        return $http.get(_apiUrl + 'api/psr/scores/squads_summary.json?week=' + date.week + '&year=' + date.year);
    };

    this.getUnitScores = function (date) {
        return $http.get(_apiUrl + 'api/psr/scores/units_summary.json?week=' + date.week + '&year=' + date.year);
    };

    this.getScores = function (repEntity, date) {
        var url = 'api/psr/scores.json?' + repEntity.type.toLowerCase() + '_id=' + repEntity.id;
        if (date) {
            url += '&week=' + date.week + '&year=' + date.year;
        }
        return $http.get(_apiUrl + url, {withCredentials: true});
    };

    this.save = function (score) {
        var url;
        if (score.id) {
            url = _apiUrl + 'api/psr/scores/' + score.id + '.json';
            return $http.patch(url, {score: score}, {withCredentials: true});
        } else {
            url = _apiUrl + 'api/psr/scores.json';
            return $http.post(url, {score: score}, {withCredentials: true});
        }
    };

    this.copyLastReport = function (repEntity) {
        var url = _apiUrl + 'api/psr/scores/copy_last_report.json?';

        return $http.post(url + repEntity.type.toLowerCase() + '_id=' + repEntity.id);
    };
});
