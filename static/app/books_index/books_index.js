(function () {
    'use strict';

    angular.module('bookshelf.books_index')
        .controller('BooksIndexCtrl', BooksIndexCtrl);

    BooksIndexCtrl.$inject = ['$state', 'booksService'];

    /**
     * @name BooksIndexCtrl
     * @desc Controller of the view presenting the books
     *
     * @ngInject */
    function BooksIndexCtrl($state, booksService) {
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
            src: [],
            filtered: [],
            page: []
        };

        activate();

        function activate() {
            booksService.getBooks().then(getBooks, booksError);
        }

        function getBooks(data) {
            vm.books.src = data.data;
            vm.filters = booksService.getFilters(vm.books.src);
            vm.books.filtered = filterBooks(vm.books, vm.searchParams, vm.filterParams);
            vm.page = preparePaging(vm.books);
            vm.books.page = getCurrentPage(vm.books, vm.page);
            vm.loading = false;
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
        }

        function searchChange(searchParams) {
            vm.searchParams = searchParams;
            vm.books.filtered = filterBooks(vm.books, vm.searchParams, vm.filterParams);
            vm.page = preparePaging(vm.books);
            vm.books.page = getCurrentPage(vm.books, vm.page);
        }

        function filterChange(filterParams) {
            vm.filterParams = filterParams;
            vm.books.filtered = filterBooks(vm.books, vm.searchParams, vm.filterParams);
            vm.page = preparePaging(vm.books);
            vm.books.page = getCurrentPage(vm.books, vm.page);
        }

        function filterBooks(books, searchParams, filterParams){
            return booksService.filterBooks(books.src, searchParams, filterParams);
        }

        function getCurrentPage(books, page){
            return books.filtered.slice((page.current - 1) * page.size, page.current * page.size);
        }

        function preparePaging(books){
            return {
                size: 6,
                total: Math.ceil(books.filtered.length / 6),
                current: 1
            }
        }
    }

})();