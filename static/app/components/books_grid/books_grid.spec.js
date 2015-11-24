/* jshint -W117 */
describe('Directive: bs-books-grid', function () {
    var element, scope, compile,
        defaultData = [{
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
        }],
        validTemplate = '<bs-books-grid books="data"></bs-books-grid>';

    function createDirective(data, template) {
        var elm;

        scope.data = data || defaultData;

        elm = compile(template || validTemplate)(scope);
        scope.$digest();

        return elm;
    }

    beforeEach(function () {
        module('bookshelf.books_grid', function ($stateProvider) {
            // mock books-details state
            $stateProvider.state('books-details', {url: '/book/{bookId:[0-9]{1,8}}'});
        });

        module('components/books_grid/book.html');
        module('components/books_grid/books_grid.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('compiled', function () {
        var compiled_books_grid;

        beforeEach(function () {
            compiled_books_grid = createDirective();
        });

        it('should have the matching number of books', function () {
            var books = compiled_books_grid.find('bs-book');
            expect(books).toBeDefined();
            return expect(books.length).toBe(4);
        });

        describe('shelf', function () {
            var books;

            beforeEach(function () {
                books = compiled_books_grid.find('bs-book');
            });

            it('for small screens should be after 2nd book', function () {
                expect(books).toBeDefined();
                expect(books.length).toBe(4);
                var shelf = books.eq(1).next();
                expect(shelf).toBeDefined();
                expect(shelf.length).toBe(1);
                expect(shelf.eq(0)).toHaveClass('shelf');
                return expect(shelf.eq(0)).toHaveClass('visible-sm');
            });
            it('for medium&large screens should be after 3rd book', function () {
                expect(books).toBeDefined();
                expect(books.length).toBe(4);
                var shelf = books.eq(2).next();
                expect(shelf).toBeDefined();
                expect(shelf.length).toBe(1);
                expect(shelf.eq(0)).toHaveClass('shelf');
                expect(shelf.eq(0)).toHaveClass('visible-md');
                return expect(shelf.eq(0)).toHaveClass('visible-lg');
            });
            it('for small&medium&large screens should be after the last book', function () {
                expect(books).toBeDefined();
                return expect(books.length).toBe(4);
            });
        });

        it('should be empty if no books passed', function () {
            compiled_books_grid = createDirective(null, '<bs-books-grid></bs-books-grid>');
            return expect(compiled_books_grid.html()).not.toContainText('bs-book');
        });
        it('should be empty if the books\' list is empty', function () {
            compiled_books_grid = createDirective([]);
            return expect(compiled_books_grid.html()).not.toContainText('bs-book');
        });
    });


});
