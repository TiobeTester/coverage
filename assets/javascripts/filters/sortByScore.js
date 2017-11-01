Psr.filter('sortByScore', function ($filter) {
    var globalPredicate;
    return function (input, predicate, reverse) {
        if (predicate != null && predicate !== 'name') {
            globalPredicate = predicate;
            var unscored = $filter('filter')(input, function (v, i, a) {
                return v.scores[predicate].score == null;
            }, true);

            var scored = $filter('filter')(input, function (v, i, a) {
                return v.scores[predicate].score != null;
            }, true);

            return Array.prototype.concat(
                $filter('orderBy')(scored, orderTags, reverse),
                orderbyName(unscored));
        }

        return orderbyName(input);
    };

    function orderTags(score) {
        var result;
        score = score.scores[globalPredicate].score;
        switch (score) {
            case 'flag':
                result = 1;
                break;
            case 'risk':
                result = 2;
                break;
            case 'ok':
                result = 3;
                break;
            default:
                result = 4;
                break;
        }
        return result;
    }

    function orderbyName(repEntities) {
        var withParent = $filter('filter')(repEntities, function (v, i, a) {
            return v.parent_name != null; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        }, true);

        var withoutParent = $filter('filter')(repEntities, function (v, i, a) {
            return v.parent_name === null; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        }, true);

        return Array.prototype.concat(
            $filter('orderBy')(withParent, getFullName, false),
            $filter('orderBy')(withoutParent, 'name', false));
    }

    function getFullName(repEntity) {
        return ''.concat(repEntity.parent_name, repEntity.name); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
    }
});
