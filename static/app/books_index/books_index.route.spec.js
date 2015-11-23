'use strict';

describe('bookshelf.books_index', function () {
    var views = {
        booksIndex: 'books_index/books_index.html'
    };
    describe('state books-index', function () {

        beforeEach(function () {
            module('bookshelf.books_index');

            inject(function ($httpBackend, $templateCache) {
                $templateCache.put(views.booksIndex, '');
                $httpBackend.when('GET', 'api/v1/books')
                            .respond([]);

            });
        });

        it('should map books-index route to books-index View template', inject(function ($state) {
            expect($state.get('books-index').templateUrl).toEqual(views.booksIndex);
        }));

        it('should work with $state.go', inject(function ($rootScope, $state) {
            $state.go('books-index');
            $rootScope.$apply();
            expect($state.is('books-index')).toBe(true);
        }));
    });

});