Psr.service('evidence', function ($http, configuration, Upload, $q) {
    var _apiUrl = configuration.getApiUrl();

    this.save = function (evidence, scoreId) {
        var promises = [];
        for (var i = 0; i < evidence.length; i++) {
            if (!evidence[i].id && !evidence[i].isDeleted) {
                promises.push(
                    Upload.upload({
                        url: _apiUrl + 'api/psr/evidence',
                        data: {
                            'evidence[comments]': evidence[i].comments,
                            'evidence[score_id]': scoreId,
                            'evidence[image]': evidence[i].image
                        },
                        withCredentials: true
                    })
                );
            }

            var url, payload;
            if (evidence[i].id && !evidence[i].isDeleted) {
                url = _apiUrl + 'api/psr/evidence/' + evidence[i].id + '.json';
                payload = {comments: evidence[i].comments};
                promises.push($http.patch(url, payload, {withCredentials: true}));
            }

            if (evidence[i].id && evidence[i].isDeleted) {
                url = _apiUrl + 'api/psr/evidence/' + evidence[i].id + '.json';
                promises.push($http.delete(url, {withCredentials: true}));
            }
        }
        return $q.all(promises);
    };

});
