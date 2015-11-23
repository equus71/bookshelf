(function () {
    'use strict';

    angular.module('bookshelf.books_filter')
        .directive('bsBooksFilter', bsBooksFilter);

    bsBooksFilter.$inject = [];

    /**
     * @name bsBooksFilter
     * @desc Component delivering filters with category & genre
     * @param {Array} categories List of available categories
     * @param {Array} genres List of available genres
     * @param {boolean} disable Flag disabling selects (e.g. while loading the data)
     * @param {function} filterChange Callback for a filter change
     *
     *  @ngInject */
    function bsBooksFilter() {
        var directive = {
            restrict: 'E',
            scope: {
                categories: '=',
                genres: '=',
                disable: '=?',
                filterChange: '&'
            },
            templateUrl: 'components/books_filter/books_filter.html',
            link: linkFn
        };
        return directive;

        function linkFn(scope) {
            scope.selectedCategory = '';
            scope.selectedGenre = '';

            scope.categoryChange = categoryChangeFn;
            scope.genreChange = genreChangeFn;

            function categoryChangeFn() {
                scope.filterChange({filter: {category: scope.selectedCategory, genre: scope.selectedGenre}});
            }

            function genreChangeFn() {
                scope.filterChange({filter: {category: scope.selectedCategory, genre: scope.selectedGenre}});
            }
        }
    }

})();