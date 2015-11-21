(function () {
    'use strict';

    angular.module('bookshelf.widgets')
        .directive('bsSpinner', bookshelfSpinner);

    bookshelfSpinner.$inject = [];

    function bookshelfSpinner() {
        var directive = {
            restrict: 'E',
            template: '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
        };
        return directive;
    }

})();