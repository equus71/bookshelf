(function () {
    'use strict';

    angular.module('bookshelf.books_details')
        .controller('BooksDetailsCtrl', BooksDetailsCtrl);

    BooksDetailsCtrl.$inject = ['$state', 'booksService'];
    /**
     * @name BooksDetailsCtrl
     * @desc Controller of the view presenting the details of the books (inc. recommendations)
     *
     * @ngInject */
    function BooksDetailsCtrl($state, booksService) {
        var vm = this;

        vm.bookLoading = true;
        vm.recommendationsLoading = true;
        vm.recommendationsError = false;
        vm.book = {};
        vm.recommendations = [];

        activate();

        function activate(){
            booksService.getBookById($state.params.bookId).then(getBook, bookError);
            booksService.recommendedForBookById($state.params.bookId).then(getRecommendations, recommendationsError);
        }

        function getBook(data) {
            vm.bookLoading = false;
            vm.book = data.data;
        }

        function getRecommendations(data) {
            vm.recommendationsLoading = false;
            vm.recommendations = data.data;
        }

        function bookError(data) {
            if(data.status === 404){
                $state.go('404');
            }else{
                $state.go('500');
            }
        }

        function recommendationsError(data) {
            vm.recommendationsError = true;
        }
    }

})();