(function () {
    'use strict';

    angular
        .module('bookshelf', [
            'bookshelf.books_index',
            'bookshelf.books_details',
            'bookshelf.core',
            'blocks.router',
            'ngAnimate',
            'ngCookies',
            'ui.router',
            'ui.bootstrap'
        ])
        .run(csrfRun);

    csrfRun.$inject = ['$http'];

    /**
     * Inject headers enabling csrftoken
     *
     * NOTE: this app does not do anything demanding csrftoken.
     *  Still, there is no reason to disable the additional security.
     *
     * @param {$http} $http angular http service
     *
     * @ngInject */
    function csrfRun($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();