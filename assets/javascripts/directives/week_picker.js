Psr.directive('weekPicker', function (scores, session, $rootScope) {
    function getWeeksInYear(year) {
        return Math.max(
            moment(new Date(year, 11, 31)).isoWeek(),
            moment(new Date(year, 11, 31 - 7)).isoWeek()
        );
    }

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'views/heatmap/_week-picker.html',

        link: function (scope) {
            var present = moment();
            scope.currentWeekNo = session.getCurrentDate().week;
            scope.presentWeekNo = present.isoWeek();
            scope.presentYear = present.year();
            scope.currentYear = session.getCurrentDate().year;
            scope.weekDifference = 0;
            updateWeekDifference();

            scope.getPreviousWeekYear = function (event) {
                if (event.type !== 'click') {
                    return;
                }

                scope.currentWeekNo -= 1;

                if (scope.currentWeekNo === 0) {
                    scope.currentYear -= 1;
                    scope.currentWeekNo = getWeeksInYear(scope.currentYear);
                }

                session.setCurrentDate(scope.currentWeekNo, scope.currentYear);
                scope.weekDifference += 1;
            };

            scope.getNextWeekYear = function (event) {
                if (event.type !== 'click') {
                    return;
                }

                scope.currentWeekNo += 1;

                if (scope.currentWeekNo > getWeeksInYear(scope.currentYear)) {
                    scope.currentYear += 1;
                    scope.currentWeekNo = 1;
                }

                session.setCurrentDate(scope.currentWeekNo, scope.currentYear);
                scope.weekDifference -= 1;
            };

            scope.getYears = function () {
                return _.range(2016, moment().year() + 1);
            };

            scope.getWeeks = function (selectYear) {
                return _.range(1, getWeeksInYear(selectYear) + 1);
            };

            scope.isCurrentWeek = function () {
                var currentWeek = moment().isoWeek();
                var currentYear = moment().year();
                var sessionWeek = session.getCurrentDate().week;
                var sessionYear = session.getCurrentDate().year;

                return currentWeek === sessionWeek && currentYear === sessionYear;
            };

            scope.setWeekYear = function (selectWeek, selectYear) {
                if (selectWeek && selectYear) {
                    scope.currentWeekNo = parseInt(selectWeek);
                    scope.currentYear = parseInt(selectYear);
                    session.setCurrentDate(scope.currentWeekNo, scope.currentYear);
                    $rootScope.showWeekPicker = false;
                    updateWeekDifference();
                }
            };

            function remainingWeeksInYear() {
                return getWeeksInYear(scope.currentYear) - scope.currentWeekNo;
            }

            function weeksInYearsInBetween() {
                var counter = 0;
                for (var i = scope.currentYear + 1; i < scope.presentYear; i++) {
                    counter += getWeeksInYear(i);
                }
                return counter;
            }

            function updateWeekDifference() {
                if (scope.currentYear === scope.presentYear) {
                    scope.weekDifference = scope.presentWeekNo - scope.currentWeekNo;
                } else {
                    scope.weekDifference = remainingWeeksInYear() + weeksInYearsInBetween() + scope.presentWeekNo;
                }
            }
        }
    };
});
