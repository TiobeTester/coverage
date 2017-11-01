(function () {
    'use strict';

    Psr.service('overviewData', function (GLOBALS) {
        var sortIndex = 0;
        var selectedView = GLOBALS.appDefaultReportingEntity;
        var viewingReport = null;

        this.getColumnSortIndex = function () {
            return sortIndex;
        };

        this.setColumnSortIndex = function (index) {
            sortIndex = index;
        };

        this.setSelectedView = function (view) {
            selectedView = view;
            sortIndex = 0;
        };

        this.getSelectedView = function () {
            return selectedView;
        };

        this.setViewingReport = function (vr) {
            viewingReport = vr;
        };

        this.getViewingReport = function () {
            return viewingReport;
        };
    });
})();
