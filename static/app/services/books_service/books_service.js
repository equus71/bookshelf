(function () {
    'use strict';

    angular
        .module('bookshelf.books_service')
        .factory('booksService', booksService);

    booksService.$inject = ['$http', 'lodash'];

    /**
     * @name booksService
     * @desc The service handling the operations on the books
     *
     * @ngInject */
    function booksService($http, lodash) {

        var service = {
            getBooks: getBooks,
            getBookById: getBookById,
            recommendedForBookById: recommendedForBookById,
            filterBooks: filterBooks,
            getFilters: getFilters
        };

        return service;

        /**
         * @desc Retrieve all books from server
         * @param filters the optional filters
         * @returns {HttpPromise} promise of the books' data
         */
        function getBooks(filters) {
            filters = angular.isDefined(filters) ? filters : [];
            return $http.get('api/v1/books', {params: filters});
        }

        /**
         * @desc Retrieve the book by its Id
         * @param bookId the id of book to retrieve
         * @returns {HttpPromise} promise of the book's data
         */
        function getBookById(bookId) {
            return $http.get('api/v1/books/' + bookId);
        }

        /**
         * @desc Retrieve the recommended books by the source book's id
         * @param bookId the id of book which needs the recommendation
         * @returns {HttpPromise} promise of the books' data
         */
        function recommendedForBookById(bookId) {
            return $http.get('api/v1/books/' + bookId + '/recommended');
        }

        /**
         * @desc Retrieve the recommended books by the source book's id
         * @param books The collection to be filtered
         * @param searchParams The search params to filter by
         * @param filterParams The filter params to filter by
         * @returns {Array} Filtered set of books
         */
        function filterBooks(books, searchParams, filterParams) {
            var filtered = books;
            var category = filterParams ? filterParams.category : '',
                genre = filterParams ? filterParams.genre : '',
                searchQuery = searchParams ? searchParams.query ? searchParams.query.toLowerCase() : '' : '';

            if (category || genre || searchQuery) {
                filtered = books.filter(function (element) {
                    var matchCategory = (!category || element.genre.category === category ),
                      matchGenre = (!genre || element.genre.name === genre ),
                      matchQuery = (!searchQuery || element.author.name.toLowerCase().indexOf(searchQuery) > -1 || element.name.toLowerCase().indexOf(searchQuery) > -1);
                    return matchCategory && matchGenre && matchQuery;
                });
            }
            return filtered;
        }

        /**
         * @desc Get list of genres and categories of passed set of books
         * @param books List of books from which data will be extracted
         * @returns {{genres: *, categories: *}} List of all genres and categories of passed books
         */
        function getFilters(books) {
            return {
                genres: lodash.uniq(books.map(function (element) {
                    return element.genre.name;
                })),
                categories: lodash.uniq(books.map(function (element) {
                    return element.genre.category;
                }))
            };
        }

    }
})();
