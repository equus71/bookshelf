'use strict';

describe('bookshelf.books_index', function () {
    var ctrl, booksService, scope,
        mockData = {
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
            }, {
                "author": {
                    "avatar": "http://lorempixel.com/250/250/",
                    "name": "Douglas Adams"
                },
                "cover": "http://lorempixel.com/500/700/",
                "genre": {
                    "category": "Fiction",
                    "name": "Fantasy"
                },
                "id": "b21269727",
                "likes": 935,
                "name": "The Hitchhiker’s Guide to the Galaxy",
                "published": "2003-12-25T20:30:15.766Z"
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
            }, {
                "author": {
                    "avatar": "http://lorempixel.com/250/250/",
                    "name": "Douglas Adams"
                },
                "cover": "http://lorempixel.com/500/700/",
                "genre": {
                    "category": "Fiction",
                    "name": "Fantasy"
                },
                "id": "b21269727",
                "likes": 935,
                "name": "The Hitchhiker’s Guide to the Galaxy",
                "published": "2003-12-25T20:30:15.766Z"
            }],
            categories: ['Non-Fiction', 'Fiction'],
            genres: ['History', 'Arts', 'Christian Books', 'Fantasy']
        };

    beforeEach(function () {
        module('bookshelf.books_index');

        inject(function ($controller, $q, $rootScope, _booksService_) {
            scope = $rootScope.$new();
            booksService = _booksService_;
            spyOn(booksService, 'getBooks').and.returnValue($q.when({data: mockData.books}));
            ctrl = $controller('BooksIndexCtrl', {$scope: scope});
        });
    });

    describe('BooksIndexCtrl controller', function () {

        it('should be defined', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have the loading flag on start', function () {
            expect(ctrl.loading).toBe(true);
        });

        describe('on activate', function () {

            beforeEach(function () {
                // $q needs a scope digest to process the mocked service
                scope.$digest();
            });

            it('should have the loading flag set off', function () {
                expect(ctrl.loading).toBe(false);
            });

            it('should load the books', function () {
                expect(ctrl.books.src).toEqual(mockData.books);
            });

            it('should prepare the categories and genres', function () {
                expect(ctrl.filters.categories).toEqual(mockData.categories);
                expect(ctrl.filters.genres).toEqual(mockData.genres);
            });

            it('should prepare the paging', function () {
                expect(ctrl.books.page.length).toBe(6);
                expect(ctrl.page.total).toBe(2);
            });
        });

        describe('paging', function () {
            it('by default should start from first page', function () {
                expect(ctrl.page.current).toBe(1);
            });

            describe('on page change', function () {
                it('should switch the page', function () {
                    ctrl.page.current = 2;
                    ctrl.page.total = 2;
                    ctrl.books.filtered = mockData.books;

                    ctrl.pageChange();

                    expect(ctrl.page.current).toBe(2);
                    expect(ctrl.books.page.length).toBe(1);
                });

                it('should rest currentPage if bigger than totalPages', function () {
                    ctrl.page.current = 101;
                    ctrl.page.total = 100;

                    ctrl.pageChange();

                    expect(ctrl.page.current).toBe(1);
                });

                it('should scroll to top', function () {
                    //    TODO: define the spec
                });
            });
        });

        describe('on filter change', function () {
            it('should filter books', function () {
                ctrl.books = {src: mockData.books};
                ctrl.filterChange({category: 'Fiction'});

                expect(ctrl.books.filtered.length).toBe(2);
            });

            it('should reset paging', function () {
                ctrl.filterChange({genre: 'Fantasy'});

                expect(ctrl.page.current).toBe(1);
            });
        });

        describe('on search change', function () {
            it('should search for the books', function () {
                ctrl.books = {src: mockData.books};
                ctrl.searchChange({query: 'Tolkein'});

                expect(ctrl.books.filtered.length).toBe(1);

            });

            it('should reset paging', function () {
                ctrl.books = {src: mockData.books};
                ctrl.searchChange({query: 'Tolkein'});

                expect(ctrl.page.current).toBe(1);
            });
        });

        describe('on error', function () {
            it('should redirect to 500', function () {

            });
        });
    });
});