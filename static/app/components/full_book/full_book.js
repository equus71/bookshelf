(function () {
    'use strict';

    angular.module('bookshelf.full_book')
        .directive('bsFullBook', bsFullBook);

    bsFullBook.$inject = [];

    /**
     * @name bsFullBook
     * @desc Component displaying complete information about book
     * @param {Book} bookData data of the book
     *
     * @ngInject */
    function bsFullBook() {
        var directive = {
            restrict: 'E',
            scope: {
                bookData: '='
            },
            templateUrl: 'components/full_book/full_book.html'
        };
        return directive;
    }

})();