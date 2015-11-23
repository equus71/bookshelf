'use strict';

describe('bookshelf.books_details', function () {
    var views = {
        booksDetails: 'books_details/books_details.html'
    };
    describe('state books-details', function () {

        beforeEach(function () {
            module('bookshelf.books_details');

            inject(function ($templateCache) {
                $templateCache.put(views.booksDetails, '');
            });
        });

        it('should map books-details route to books-details View template', inject(function ($state) {
            expect($state.get('books-details').templateUrl).toEqual(views.booksDetails);
        }));

        it('should work with $state.go', inject(function ($rootScope, $state) {
            $state.go('books-details', {bookId: 'b123456789'});
            $rootScope.$apply();
            expect($state.is('books-details')).toBe(true);
        }));
    });

});