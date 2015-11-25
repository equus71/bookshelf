/* jshint -W117 */
describe('Service: booksService', function () {
    var httpBackend, rootScope, booksService,
        mockData = [{
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
        }];

    beforeEach(function () {
        module('bookshelf.books_service');

        inject(function ($httpBackend, $rootScope, _booksService_) {
            httpBackend = $httpBackend;
            rootScope = $rootScope;
            booksService = _booksService_;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('#getBooks', function () {
        it('should exist', function () {
            expect(booksService.getBooks).toBeDefined();
        });

        it('should return data', function () {
            httpBackend.when('GET', 'api/v1/books').respond(200, mockData);
            booksService.getBooks().then(function (data) {
                expect(data.data.length).toBe(4);
                expect(data.data.map(function (elm) {
                    return elm.id;
                })).toEqual(mockData.map(function (elm) {
                    return elm.id;
                }));
            });
            rootScope.$apply();
            httpBackend.flush();
        });

        it('should support filtering by search query', function () {
            httpBackend.when('GET', 'api/v1/books?search=Tagore').respond(200, [mockData[3]]);
            booksService.getBooks({search: 'Tagore'}).then(function (data) {
                expect(data.data.length).toBe(1);
                expect(data.data.map(function (elm) {
                    return elm.id;
                })).toEqual([mockData[3]].map(function (elm) {
                    return elm.id;
                }));
            });
            rootScope.$apply();
            httpBackend.flush();
        });

        it('should support filtering by category', function () {
            httpBackend.when('GET', 'api/v1/books?category=Non-Fiction').respond(200, [mockData[3]]);
            booksService.getBooks({category: 'Non-Fiction'}).then(function (data) {
                expect(data.data.length).toBe(1);
                expect(data.data.map(function (elm) {
                    return elm.id;
                })).toEqual([mockData[3]].map(function (elm) {
                    return elm.id;
                }));
            });
            rootScope.$apply();
            httpBackend.flush();
        });

        it('should support filtering by genre', function () {
            httpBackend.when('GET', 'api/v1/books?genre=Arts').respond(200, [mockData[2]]);
            booksService.getBooks({genre: 'Arts'}).then(function (data) {
                expect(data.data.length).toBe(1);
                expect(data.data.map(function (elm) {
                    return elm.id;
                })).toEqual([mockData[2]].map(function (elm) {
                    return elm.id;
                }));
            });
            rootScope.$apply();
            httpBackend.flush();
        });

        it('should return empty list for excluding filters', function () {
            httpBackend.when('GET', 'api/v1/books?category=Fiction&genre=Arts&search=Tolkein').respond(200, []);
            booksService.getBooks({search: 'Tolkein', genre: 'Arts', category: 'Fiction'}).then(function (data) {
                expect(data.data.length).toBe(0);
            });
            rootScope.$apply();
            httpBackend.flush();
        });
    });

    describe('#getBookById', function () {
        it('should exist', function () {
            expect(booksService.getBookById).toBeDefined();
        });

        it('should return data', function () {
            httpBackend.when('GET', 'api/v1/books/b841267346').respond(200, mockData[0]);
            booksService.getBookById('b841267346').then(function (data) {
                expect(data.data.id).toBe('b841267346');
                expect(data.data.name).toBe('The Lord of the Rings');
            });
            rootScope.$apply();
            httpBackend.flush();
        });
    });

    describe('#recommendedForBookById', function () {
        it('should exist', function () {
            expect(booksService.recommendedForBookById).toBeDefined();
        });

        it('should return data', function () {
            httpBackend.when('GET', 'api/v1/books/b841267346/recommended').respond(200, mockData);
            booksService.recommendedForBookById('b841267346').then(function (data) {
                expect(data.data.length).toBe(4);
                expect(data.data.map(function (elm) {
                    return elm.id;
                })).toEqual(mockData.map(function (elm) {
                    return elm.id;
                }));
            });
            rootScope.$apply();
            httpBackend.flush();
        });
    });

        describe('#getFilters', function () {
        it('should exist', function () {
            expect(booksService.getFilters).toBeDefined();
        });

        it('should return genres and categories of all books', function () {
            var filters = booksService.getFilters(mockData);
            expect(filters.genres.length).toBe(4);
            expect(filters.categories.length).toBe(2);
        });
    });
});
