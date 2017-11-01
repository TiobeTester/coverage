Psr.directive('lightbox', function ($mdDialog) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var image = attrs.lightboxImg;
                var title = attrs.lightboxTitle;
                showLightboxModal(image, title);
            });

            function showLightboxModal(image, title) {
                var confirm = $mdDialog.confirm({
                    templateUrl: 'views/heatmap/_lightbox.html',
                    clickOutsideToClose: true,
                    controller: 'LightboxCtrl',
                    locals: {
                        image: image,
                        title: title
                    }
                });

                $mdDialog.show(confirm);
            }
        }
    };
});
