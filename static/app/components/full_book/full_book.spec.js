/* jshint -W117 */
describe('Directive: bs-full-book', function () {
    var test_date = new Date();
    test_date.setYear(test_date.getFullYear() - 10);
    var scope, compile, filter,
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
                "content": "Donec at tempus augue. Cras ut turpis vestibulum."
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
        validTemplate = '<bs-full-book book-data="data"></bs-full-book>';

    function createDirective(data, template) {
        var elm;

        scope.data = data || defaultData;

        elm = compile(template || validTemplate)(scope);
        scope.$digest();

        return elm;
    }

    beforeEach(function () {
        module('bookshelf.full_book');

        module('components/full_book/full_book.html');

        inject(function ($rootScope, $compile, $filter) {
            scope = $rootScope.$new();
            compile = $compile;
            filter = $filter;
        });
    });

    describe('compiled', function () {
        var compiled_full_book;

        beforeEach(function () {
            compiled_full_book = createDirective();
        });

        it('should have the cover image', function () {
            var images = compiled_full_book.find('img');
            expect(images).toBeDefined();
            expect(images.length).toBe(2);
            return expect(images.eq(0).attr('src')).toEqual(defaultData.cover);
        });

        it('should show the title', function () {
            return expect(compiled_full_book.html()).toContainText(defaultData.name);
        });

        it('should show the author', function () {
            return expect(compiled_full_book.html()).toContainText(defaultData.author.name);
        });

        it('should show the description', function () {
            return expect(compiled_full_book.html()).toContainText(defaultData.description);
        });

        it('should show the genre&category', function () {
            expect(compiled_full_book.html()).toContainText(defaultData.genre.category);
            return expect(compiled_full_book.html()).toContainText(defaultData.genre.name);
        });

        it('should show the author avatar', function () {
            var images = compiled_full_book.find('img');
            expect(images).toBeDefined();
            expect(images.length).toBe(2);
            return expect(images.eq(1).attr('src')).toEqual(defaultData.author.avatar);
        });

        it('should show the first sentence of introductory content as headline', function () {
            var headlines = compiled_full_book.find('h3');
            expect(headlines).toBeDefined();
            expect(headlines.length).toBe(2);
            return expect(headlines.eq(1).html()).toContainText('Donec at tempus augue.');
        });

        it('should show the introductory content', function () {
            var full_book = compiled_full_book.html();
            expect(full_book).toContainText('Cras ut turpis vestibulum.');
            defaultData.introduction.slice(1).forEach(function (element) {
                expect(full_book).toContainText(element.content);
            });
            return;
        });

        it('should show votes/likes', function () {
            return expect(compiled_full_book.html()).toContainText(defaultData.likes);
        });

        describe('published date', function () {
            it('should show absolute date', function () {
                return expect(compiled_full_book.html()).toContainText(filter('amDateFormat')(test_date, 'dddd, MMMM Do YYYY, h:mm a'));
            });
            it('should show relative date', function () {
                return expect(compiled_full_book.html()).toContainText('10 years ago');
            });
        });
    });

});
