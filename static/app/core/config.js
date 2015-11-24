(function () {
    'use strict';

    var core = angular.module('bookshelf.core');

    /**
     * Set a smooth scrolling function
     */
    core.value('duScrollEasing', easeInOutQuad);

    function easeInOutQuad(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

})();