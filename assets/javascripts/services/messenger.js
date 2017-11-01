Psr.service('messenger', function ($mdToast) {

    this.display = function (message) {
        $mdToast.show($mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(3000));
    };
});
