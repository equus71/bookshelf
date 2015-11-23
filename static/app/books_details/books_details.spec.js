'use strict';

describe('bookshelf.books_details', function () {
    var ctrl, booksService, scope,
        mockData = {
            book: {
                "author": {
                    "avatar": "http://lorempixel.com/250/250/",
                    "name": "JRR Tolkein"
                },
                "cover": "http://lorempixel.com/500/700/",
                "description": "WH Auden thought this tale of fantastic creatures looking for lost jewellery was a \"masterpiece\".",
                "genre": {
                    "category": "Non-Fiction",
                    "name": "History"
                },
                "id": "b841267346",
                "introduction": [{
                    "content": "Lorem ipsum dolor sit amet,"
                }, {
                    "content": "Integer pretium quam et "
                }, {
                    "content": "Curabitur ultri"
                }, {
                    "content": "Donec at tempus augue. "
                }, {
                    "content": "Sed feugiat metus arcu, "
                }],
                "likes": 816,
                "name": "The Lord of the Rings",
                "published": "2003-09-18T01:59:14.918Z"
            },
            books: [{
                "author": {
                    "avatar": "http://lorempixel.com/250/250/",
                    "name": "JRR Tolkein"
                },
                "cover": "http://lorempixel.com/500/700/",
                "genre": {
                    "category": "Non-Fiction",
                    "name": "History"
                },
                "id": "b841267346",
                "likes": 816,
                "name": "The Lord of the Rings",
                "published": "2003-09-18T01:59:14.918Z"
            }, {
                "author": {
                    "avatar": "http://lorempixel.com/250/250/",
                    "name": "Harper Lee"
                },
                "cover": "http://lorempixel.com/500/700/",
                "genre": {
                    "category": "Non-Fiction",
                    "name": "Arts"
                },
                "id": "b284012025",
                "likes": 221,
                "name": "To Kill a Mockingbird",
                "published": "2012-12-12T15:59:48.420Z"
            }, {
                "author": {
                    "avatar": "http://lorempixel.com/250/250/",
                    "name": "Rabindranath Tagore"
                },
                "cover": "http://lorempixel.com/500/700/",
                "genre": {
                    "category": "Non-Fiction",
                    "name": "Christian Books"
                },
                "id": "b283256024",
                "likes": 484,
                "name": "The Home and the World",
                "published": "1977-09-28T18:27:52.687Z"
            }]
        };

    describe('BooksIndexCtrl controller', function () {

        beforeEach(function () {
            module('bookshelf.books_details');

            inject(function ($controller, $q, $rootScope, _booksService_) {
                scope = $rootScope.$new();
                booksService = _booksService_;
                spyOn(booksService, 'getBookById').and.returnValue($q.when({data: mockData.book}));
                spyOn(booksService, 'recommendedForBookById').and.returnValue($q.when({data: mockData.books}));
                ctrl = $controller('BooksDetailsCtrl', {$scope: scope});
            });
        });

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have the bookLoading flag of on start', function () {
            expect(ctrl.bookLoading).toBe(true);
        });

        it('should have the recommendationLoading flag of on start', function () {
            expect(ctrl.recommendationsLoading).toBe(true);
        });

        describe('on activate', function () {

            beforeEach(function () {
                // $q needs a scope digest to process the mocked service
                scope.$digest();
            });

            it('should have the loading flag set off', function () {
                expect(ctrl.recommendationsLoading).toBe(false);
                return expect(ctrl.bookLoading).toBe(false);
            });

            it('should load the book', function () {
                return expect(ctrl.book).toEqual(mockData.book);
            });

            it('should load the recommendations', function () {
                return expect(ctrl.recommendations).toEqual(mockData.books);
            });

        });
    });

    describe('BooksIndexCtrl controller errors', function () {

        beforeEach(function () {
            module('bookshelf.books_details');
            module('core/500.html');
            module('core/404.html');
        });

        describe('on error', function () {
            it('should redirect to 404 if book does not exist', inject(function ($controller, $q, $rootScope, $state, _booksService_) {
                scope = $rootScope.$new();
                booksService = _booksService_;
                spyOn(booksService, 'getBookById').and.returnValue($q.reject({status: 404}));
                spyOn(booksService, 'recommendedForBookById').and.returnValue($q.when(mockData.books));
                ctrl = $controller('BooksDetailsCtrl', {$scope: scope});
                scope.$digest();
                expect($state.is('404')).toBe(true);
            }));

            it('should redirect to 500 otherwise', inject(function ($controller, $q, $rootScope, $state, _booksService_) {
                scope = $rootScope.$new();
                booksService = _booksService_;
                spyOn(booksService, 'getBookById').and.returnValue($q.reject({status: 500}));
                spyOn(booksService, 'recommendedForBookById').and.returnValue($q.when(mockData.books));
                ctrl = $controller('BooksDetailsCtrl', {$scope: scope});
                scope.$digest();
                expect($state.is('500')).toBe(true);
            }));

            it('should silently log errors with recommendations', inject(function ($controller, $q, $rootScope, $state, _booksService_) {
                // better to present the page without recommendations but with the main content than 500 page
                scope = $rootScope.$new();
                booksService = _booksService_;
                spyOn(booksService, 'getBookById').and.returnValue($q.when(mockData.book));
                spyOn(booksService, 'recommendedForBookById').and.returnValue($q.reject({status: 500}));
                ctrl = $controller('BooksDetailsCtrl', {$scope: scope});
                scope.$digest();
                expect(ctrl.recommendationsError).toBe(true);
                /* plain controller is not setting the state to the books-details,
                 * but we're okey as long it is not one of the error states */
                expect($state.is('404')).toBe(false);
                expect($state.is('500')).toBe(false);
            }));
        });
    });
});