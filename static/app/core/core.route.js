(function() {
    'use strict';

    angular
        .module('bookshelf.core')
        .run(appRun);

    function appRun(routerHelper) {
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'core/404.html',
                    title: '404'
                }
            },
            {
                state: '500',
                config: {
                    url: '/500',
                    templateUrl: 'core/500.html',
                    title: '500'
                }
            }
        ];
    }
})();