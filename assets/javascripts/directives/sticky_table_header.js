Psr.directive('stickyTableHeader', function ($mdSidenav) {
    return {
        link: function (scope, elements) {
            $(elements[0]).floatThead();

            $(elements[0]).on('floatThead', function () {
                $(elements[0]).floatThead('reflow');
            });

            scope.$watch('data', function () {
                $(elements[0]).floatThead('reflow');
            });

            scope.$watch(function () {
                return $('.md-closed').length ? true : false;
            }, function () {
                $(elements[0]).floatThead('reflow');
            });
        },

        restrict: 'A'
    };
});
