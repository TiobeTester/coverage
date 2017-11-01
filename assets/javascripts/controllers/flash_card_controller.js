Psr.controller('FlashCardCtrl', function ($mdDialog, session, $scope, metric, time, configuration) { // jscs:ignore maximumLineLength
    $scope.originalData = angular.copy(metric);
    $scope.originalEvidence = angular.copy(metric.evidence);
    $scope.metric = metric;
    $scope.showEvidence = false;
    $scope.evidence = prepareEvidence(metric);
    $scope.person = session.getSessionData();

    $scope.changed = false;
    $scope.metricName = metric.name;
    $scope.flipped = false;
    $scope.utcToLocal = time.utcToLocal;

    $scope.cancel = function () {
        if (hasAnyChanges()) {
            $scope.flipped = !$scope.flipped;
        } else {
            $mdDialog.cancel();
        }
    };

    $scope.save = function () {
        var repEntity = session.getSelectedReportingEntity();
        $mdDialog.hide({
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            score: hasAnyChanges() ? {
                metric_id: $scope.metric.id,
                id: $scope.metric.score_id,
                score: $scope.metric.score,
                comments: $scope.metric.comments,
                squad_id: repEntity.type === 'Squad' ? repEntity.id : null,
                unit_id: repEntity.type === 'Unit' ? repEntity.id : null
            } : null,
            // jscs:enable
            evidence: hasEvidenceChanges() ? $scope.evidence : []
        });
    };

    $scope.no = function () {
        $scope.flipped = false;
    };

    $scope.yes = function () {
        $mdDialog.cancel();
    };

    $scope.toggleShowEvidences = function () {
        $scope.showEvidence = !$scope.showEvidence;
        $scope.changed = hasAnyChanges();
    };

    $scope.$watchGroup(['metric.score', 'metric.comments'], function () {
        $scope.changed = hasAnyChanges();
    }, true);

    $scope.$on('paste-clipboard', function (event, args) {
        $scope.handlePaste(args);
    });

    $scope.handlePaste = function (e) {
        for (var i = 0; i < e.clipboardData.items.length; i++) {
            var item = e.clipboardData.items[i];
            if (item.type.indexOf('image') !== -1) {
                $scope.evidence.push({
                    image: item.getAsFile(),
                    comments: '',
                    imageUrl: $scope.getBlobUrl(item.getAsFile())
                });
            } else {
                console.log('Discarding non-image paste data');
            }
        }
    };

    $scope.getBlobUrl = function (blob) {
        return window.URL.createObjectURL(blob);
    };

    function hasAnyChanges() {
        return hasEvidenceChanges() || hasFlashCardChanges();
    }

    function hasEvidenceChanges() {
        for (var i = 0; i < $scope.originalEvidence.length; i++) {
            if ($scope.originalEvidence[i].comments !== $scope.evidence[i].comments ||
                $scope.evidence[i].isDeleted === true) {
                return true;
            }
        }

        for (; i < $scope.evidence.length; i++) {
            if (!$scope.evidence[i].isDeleted) {
                return true;
            }
        }
        return false;
    }

    function hasFlashCardChanges() {
        var hasScoreChanges = !angular.equals($scope.originalData.score, $scope.metric.score);
        var hasCommentsChanges = !angular.equals($scope.originalData.comments, $scope.metric.comments);
        return hasScoreChanges || hasCommentsChanges;
    }

    function prepareEvidence(metric) {
        var url = configuration.getApiUrl();
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        for (var i = 0; i < metric.evidence.length; i++) {
            metric.evidence[i].imageUrl = url + metric.evidence[i].image_url;
            metric.evidence[i].thumbnail_url = url + metric.evidence[i].thumbnail_url;
            metric.evidence[i].image_url = url + metric.evidence[i].image_url;
        }
        // jscs:enable
        return metric.evidence;
    }

    $scope.toggleRemove = function (evidence) {
        evidence.isDeleted = !evidence.isDeleted;
    };
});
