(function() {
    'use strict';

    angular
        .module('bookshelf.books_index')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'books-index',
                config: {
                    url: '/',
                    templateUrl: 'books_index/books_index.html',
                    controller: 'BooksIndexCtrl',
                    controllerAs: 'vm',
                    title: 'Books index'
                }
            }
        ];
    }
})();