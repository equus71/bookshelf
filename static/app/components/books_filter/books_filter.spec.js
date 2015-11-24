/* jshint -W117 */
describe('Directive: bs-books-filter', function () {
    var scope, compile,
        defaultData = {
            categories: ['cat1', 'cat2', 'cat3'], genres: ['gen1', 'gen2', 'gen3'], onChangeCb: function () {
            }
        },
        validTemplate = '<bs-books-filter categories="data.categories" genres="data.genres" filter-change="data.onChangeCb(filter)"></bs-books-filter>';

    function createDirective(data, template) {
        var elm;

        scope.data = data || defaultData;

        elm = compile(template || validTemplate)(scope);
        scope.$digest();

        return elm;
    }

    beforeEach(function () {
        module('bookshelf.books_filter');
        module('components/books_filter/books_filter.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('compiled', function () {
        var compiledBooksFilter;

        beforeEach(function () {
            compiledBooksFilter = createDirective();
        });

        it('should have a list of categories', function () {
            var selects = compiledBooksFilter.find('select');
            expect(selects).toBeDefined();
            expect(selects.length).toBe(2);
            expect(selects.eq(0).attr('name')).toBe('category');
            var options = selects.eq(0).find('option');
            expect(options).toBeDefined();
            // this "+ 1" is for a default option 'Any'
            return expect(options.length).toBe(defaultData.categories.length + 1);
        });

        it('should have a list of genres', function () {
            var selects = compiledBooksFilter.find('select');
            expect(selects).toBeDefined();
            expect(selects.length).toBe(2);
            expect(selects.eq(1).attr('name')).toBe('genre');
            var options = selects.eq(1).find('option');
            expect(options).toBeDefined();
            // this "+ 1" is for a default option 'Any'
            return expect(options.length).toBe(defaultData.genres.length + 1);
        });

    });


    describe('on category change', function () {
        var compiledBooksFilter, genreSelect, onChangeCb;

        beforeEach(function () {
            onChangeCb = jasmine.createSpy('onChange');

            compiledBooksFilter = createDirective({
                categories: defaultData.categories,
                genres: defaultData.genres,
                onChangeCb: onChangeCb
            });
            genreSelect = compiledBooksFilter.find('select').eq(0);
        });

        it('should call on-change callback', function () {
            genreSelect.val('string:cat2').triggerHandler('change');
            expect(onChangeCb).toHaveBeenCalled();
            return expect(onChangeCb).toHaveBeenCalledWith({category: 'cat2', genre: ''});
        });
    });

    describe('on genre change', function () {
        var compiledBooksFilter, genreSelect, onChangeCb;

        beforeEach(function () {
            onChangeCb = jasmine.createSpy('onChange');

            compiledBooksFilter = createDirective({
                categories: defaultData.categories,
                genres: defaultData.genres,
                onChangeCb: onChangeCb
            });
            genreSelect = compiledBooksFilter.find('select').eq(1);
        });

        it('should call on-change callback', function () {
            genreSelect.val('string:gen2').triggerHandler('change');
            expect(onChangeCb).toHaveBeenCalled();
            return expect(onChangeCb).toHaveBeenCalledWith({category: '', genre: 'gen2'});
        });
    });

    describe('selects', function () {
        it('should be disabled if disable flag is true', function () {
            var compiledBooksFilter = createDirective({disable: true}, '<bs-books-filter disable="data.disable"></bs-books-filter>');
            var selects = compiledBooksFilter.find('select');
            expect(selects.eq(0).prop('disabled')).toBe(true);
            return expect(selects.eq(1).prop('disabled')).toBe(true);
        });

        it('should be enabled if disable flag is false', function () {
            var compiledBooksFilter = createDirective({disable: false}, '<bs-books-filter disable="data.disable"></bs-books-filter>');
            var selects = compiledBooksFilter.find('select');
            expect(selects.eq(0).prop('disabled')).toBe(false);
            return expect(selects.eq(1).prop('disabled')).toBe(false);
        });

        it('should be enabled if disable flag is undefined', function () {
            var compiledBooksFilter = createDirective({}, '<bs-books-filter></bs-books-filter>');
            var selects = compiledBooksFilter.find('select');
            expect(selects.eq(0).prop('disabled')).toBe(false);
            return expect(selects.eq(1).prop('disabled')).toBe(false);
        });
    });
});
