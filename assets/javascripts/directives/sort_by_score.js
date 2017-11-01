Psr.directive('sortByScore', function () {
    return {
        restrict: 'A',
        scope: {
            predicate: '=',
            reverse: '=',
            sortIndex: '='
        },
        link: function (scope, element) {
            element.bind('click', function () {
                var reverse = scope.reverse;
                var predicate = scope.sortIndex;

                if (predicate === scope.predicate) {
                    reverse = !reverse;
                }

                if (!reverse && scope.reverse) {
                    predicate = 'name';
                }

                scope.predicate = predicate;
                scope.reverse = reverse;

                //scope.reverse = false; //in the case that we only want one way ordering

                scope.$apply();
            });
        }
    };
});
