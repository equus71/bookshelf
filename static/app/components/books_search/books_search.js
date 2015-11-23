(function () {
    'use strict';

    angular.module('bookshelf.books_search')
        .directive('bsBooksSearch', bsBooksSearch);

    bsBooksSearch.$inject = [];

    /**
     * @name bsBooksSearch
     * @desc Component delivering search query box
     * @param {boolean} disable Flag disabling selects (e.g. while loading the data)
     * @param {function} queryChange Callback for a search query change
     *
     *  @ngInject */
    function bsBooksSearch() {
        var directive = {
            restrict: 'E',
            scope: {
                disable: '=?',
                searchChange: '&'
            },
            templateUrl: 'components/books_search/books_search.html',
            link: linkFn
        };
        return directive;

        function linkFn(scope) {
            scope.searchQuery = '';

            scope.searchChangeFn = searchChangeFn;

            function searchChangeFn() {
                scope.searchChange({query: {query: scope.searchQuery}});
            }
        }
    }

})();
