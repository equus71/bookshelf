/* jshint -W117 */
describe('Directive: bs-books-search', function () {
    var scope, compile,
        validTemplate = '<bs-books-search search-change="data.searchChange(query)" disable="data.disable"></bs-books-search>',
        defaultData = {
            disable: false,
            searchChange: function (query) {
            }
        };

    function createDirective(data, template) {
        var elm;

        scope.data = data || defaultData;

        elm = compile(template || validTemplate)(scope);
        scope.$digest();

        return elm;
    }

    beforeEach(function () {

        module('bookshelf.books_search');
        module('components/books_search/books_search.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('compiled', function () {
        var compiledBooksSearch;

        beforeEach(function () {
            compiledBooksSearch = createDirective();
        });

        it('should have a select box', function () {
            var search = compiledBooksSearch.find('input');
            expect(search).toBeDefined();
            expect(search.length).toBe(1);
            return expect(search.eq(0).attr('name')).toBe('search');
        });

    });

    describe('query', function () {
        var compiledBooksSearch, onChangeCb, search;

        beforeEach(function () {
            onChangeCb = jasmine.createSpy('onChange');

            compiledBooksSearch = createDirective({
                searchChange: onChangeCb
            });
            search = compiledBooksSearch.find('input');
        });

        it('should be submitted on form submit', inject(function ($timeout) {
            search.val('Tolkein');
            compiledBooksSearch.find('form').triggerHandler('submit');
            // timeout is necessary to give angular time to propagate events
            $timeout(function () {
                expect(scope.searchQuery).toEqual('Tolkein');
                expect(onChangeCb).toHaveBeenCalled();
                return expect(onChangeCb).toHaveBeenCalledWith({query: 'Tolkein'});
            });
        }));

        it('should be submitted on button click', inject(function ($timeout) {
            search.val('Tolkein');
            compiledBooksSearch.find('button').triggerHandler('click');
            // timeout is necessary to give angular time to propagate events
            $timeout(function () {
                expect(scope.searchQuery).toEqual('Tolkein');
                expect(onChangeCb).toHaveBeenCalled();
                return expect(onChangeCb).toHaveBeenCalledWith({query: 'Tolkein'});
            });
        }));
    });

    describe('disable flag', function () {
        it('should disable search-box', function () {
            var compiledBooksSearch = createDirective({disable: true});
            var search = compiledBooksSearch.find('input');
            var button = compiledBooksSearch.find('button');
            expect(button.eq(0).prop('disabled')).toBe(true);
            return expect(search.eq(0).prop('disabled')).toBe(true);
        });

        it('should enable search-box', function () {
            var compiledBooksSearch = createDirective({disable: false});
            var search = compiledBooksSearch.find('input');
            var button = compiledBooksSearch.find('button');
            expect(button.eq(0).prop('disabled')).toBe(false);
            return expect(search.eq(0).prop('disabled')).toBe(false);
        });

    });
});
