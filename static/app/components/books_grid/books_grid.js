(function () {
    'use strict';

    angular.module('bookshelf.books_grid')
    .directive('bsBooksGrid', bsBooksGrid);

    bsBooksGrid.$inject = [];

    /* @ngInject */
    function bsBooksGrid() {
        var directive = {
            restrict: 'E',
            scope: {
                books: '='
            },
            templateUrl: 'components/books_grid/books_grid.html'
        };
        return directive;
    }

})();