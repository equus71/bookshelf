describe('Directive: bs-book', function () {
    var test_date = new Date();
    test_date.setYear(test_date.getFullYear() - 10);
    var element, scope, compile, filter,
        defaultData = {
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
            "published": test_date.toJSON()
        },
        validTemplate = '<bs-book book-data="data"></bs-book>';

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

        inject(function ($rootScope, $compile, $filter) {
            scope = $rootScope.$new();
            compile = $compile;
            filter = $filter;
        });
    });

    describe('compiled', function () {
        var compiled_book;

        beforeEach(function () {
            compiled_book = createDirective();
        });

        it('should have the cover image', function () {
            var book_cover = compiled_book.find('img');
            expect(book_cover).toBeDefined();
            expect(book_cover.length).toBe(1);
            return expect(book_cover.eq(0).attr('src')).toBe(defaultData.cover);
        });

        it('should show the title', function () {
            return expect(compiled_book.html()).toContainText(defaultData.name);
        });

        it('should show the author', function () {
            return expect(compiled_book.html()).toContainText(defaultData.author.name);
        });

        it('should show votes/likes', function () {
            return expect(compiled_book.html()).toContainText(defaultData.likes);
        });

        describe('published date', function () {
            it('should show absolute date', function(){
                return expect(compiled_book.html()).toContainText(filter('amDateFormat')(test_date, 'dddd, MMMM Do YYYY, h:mm a'));
            });
            it('should show relative date', function(){
                return expect(compiled_book.html()).toContainText('10 years ago');
            });
        });

        it('should show link to the book\'s details', function () {
            var details_links = compiled_book.find('a');
            expect(details_links).toBeDefined();
            expect(details_links.length).toBe(2);
            expect(details_links.eq(0).attr('href')).toContainText(defaultData.id);
            return expect(details_links.eq(1).attr('href')).toContainText(defaultData.id);
        });
    });

});

