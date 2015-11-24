(function () {
    'use strict';

    angular.module('bookshelf.books_index', [
        'blocks.router',
        'bookshelf.books_grid',
        'bookshelf.books_search',
        'bookshelf.books_filter',
        'bookshelf.books_service',
        'bookshelf.core',
        'ui.bootstrap']);

})();