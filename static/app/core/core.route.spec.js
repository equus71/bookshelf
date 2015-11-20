describe('bookshelf.core', function () {
    var views = {
        four0four: 'core/404.html',
        five00: 'core/500.html'
    };
    describe('state 404', function () {

        beforeEach(function () {
            module('bookshelf.core');
            inject(function ($templateCache) {
                $templateCache.put(views.four0four, '');
            });
        });

        it('should map /404 route to 404 View template', inject(function ($state, $templateCache) {
            expect($state.get('404').templateUrl).toEqual(views.four0four);
        }));

        it('of bookshelf should work with $state.go', inject(function ($rootScope, $state, $templateCache) {
            $state.go('404');
            $rootScope.$apply();
            expect($state.is('404')).toBe(true);
        }));

        it('should route /invalid to the otherwise (404) route', inject(function ($location, $rootScope, $state) {
            $location.path('/invalid');
            $rootScope.$apply();
            expect($state.current.templateUrl).toEqual(views.four0four);
        }));
    });

    describe('state 500', function () {

        beforeEach(function () {
            module('bookshelf.core');
            inject(function ($templateCache) {
                $templateCache.put(views.five00, '');
            });
        });

        it('should map /500 route to 500 View template', inject(function ($state, $templateCache) {
            expect($state.get('500').templateUrl).toEqual(views.five00);
        }));

        it('of bookshelf should work with $state.go', inject(function ($rootScope, $state, $templateCache) {
            $state.go('500');
            $rootScope.$apply();
            expect($state.is('500')).toBe(true);
        }));
    });
});