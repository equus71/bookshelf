(function() {
    'use strict';

    angular
        .module('bookshelf.books_details')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'books-details',
                config: {
                    url: '/book/{bookId:b[0-9]{1,12}}',
                    templateUrl: 'books_details/books_details.html',
                    controller: 'BooksDetailsCtrl',
                    controllerAs: 'vm',
                    title: 'Book\'s details'
                }
            }
        ];
    }
})();