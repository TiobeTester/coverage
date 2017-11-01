Psr.service('time', function () {
    this.utcToLocal = function (time) {
        var utc = moment.utc(time).toDate();

        return moment(utc).format('YYYY-MM-DD HH:mm');
    };

    this.isCurrentWeek = function (date) {
        var present = moment();
        return date.week === present.isoWeek() && date.year === present.year();
    };
});
