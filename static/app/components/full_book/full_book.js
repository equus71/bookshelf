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
            link: linkFn,
            templateUrl: 'components/full_book/full_book.html'
        };
        return directive;

        function linkFn(scope){
            scope.getHeadlineSliceEnd = getHeadlineSliceEnd;

            function getHeadlineSliceEnd(content){
                if (typeof content !== 'string')
                    return -1;
                return content.search(/[,.?!]\s/);
            }
        }
    }

})();