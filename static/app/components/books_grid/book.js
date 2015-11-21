(function () {
    'use strict';

    angular.module('bookshelf.books_grid')
        .directive('bsBook', bsBook);

    bsBook.$inject = [];

    /* @ngInject */
    function bsBook() {
        var directive = {
            restrict: 'E',
            scope: {
                bookData: '='
            },
            templateUrl: 'components/books_grid/book.html'
        };
        return directive;
    }

})();
