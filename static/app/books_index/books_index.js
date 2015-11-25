(function () {
    'use strict';

    angular.module('bookshelf.books_index')
        .controller('BooksIndexCtrl', BooksIndexCtrl);

    BooksIndexCtrl.$inject = ['$document', '$state', 'booksService'];

    /**
     * @name BooksIndexCtrl
     * @desc Controller of the view presenting the books
     *
     * @ngInject */
    function BooksIndexCtrl($document, $state, booksService) {
        var vm = this;

        vm.loading = true;
        vm.pageChange = pageChange;
        vm.searchChange = searchChange;
        vm.filterChange = filterChange;
        vm.searchParams = {query: ''};
        vm.filterParams = {category: '', genre: ''};
        vm.filters = {
            genres: [],
            categories: []
        };
        vm.page = {
            current: 1,
            total: 1,
            size: 6
        };
        vm.books = {
            data: [],
            page: []
        };

        activate();

        function activate() {
            booksService.getBooks().then(getBooks, booksError);
        }

        function loadBooks(data) {
            vm.books.data = data.data;
            vm.page = preparePaging(vm.books);
            vm.books.page = getCurrentPage(vm.books, vm.page);
            vm.loading = false;
        }

        function getBooks(data) {
            loadBooks(data);
            vm.filters = booksService.getFilters(vm.books.data);
        }

        function getFilteredBooks(data){
            loadBooks(data);
        }

        function booksError(data) {
            console.log('Error: cannot load the books');
            $state.go('500');
        }

        function pageChange() {
            if (vm.page.current > vm.page.total) {
                //rest currentPage if outside of scope
                vm.page.current = 1;
            }
            vm.books.page = getCurrentPage(vm.books, vm.page);
            $document.scrollTo(0, 0, 1000);
        }

        function searchChange(searchParams) {
            vm.searchParams = searchParams;
            callFilterBooks(vm.searchParams, vm.filterParams);
        }

        function filterChange(filterParams) {
            vm.filterParams = filterParams;
            callFilterBooks(vm.searchParams, vm.filterParams);
        }

        function callFilterBooks(searchParams, filterParams) {
            vm.loading = true;
            booksService.getBooks({
                category: filterParams.category,
                genre: filterParams.genre,
                search: searchParams.query
            }).then(getFilteredBooks, booksError);
        }

        function getCurrentPage(books, page) {
            return books.data.slice((page.current - 1) * page.size, page.current * page.size);
        }

        function preparePaging(books) {
            return {
                size: 6,
                total: Math.ceil(books.data.length / 6),
                current: 1
            }
        }
    }

})();