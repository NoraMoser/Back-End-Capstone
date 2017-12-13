
// Logic to be able to search through all goodreads api based on genre, other books read (radio button?), title, ratings
'use strict';
console.log('search.ctrl');

app.controller('searchCtrl', function(libraryFactory, $routeParams, $scope, userFactory) {
    
    $scope.booksbygenre = [];
    $scope.bookcollections = [];
    $scope.booksbyauthor = [];
    $scope.booksbypublisher = [];
    
    
    

$scope.searchBooksByCollection = function() {
    let searchBooksByCollection = document.getElementById("searchBooksByCollection").value;
    console.log('hello');
    libraryFactory.getBooksByCollection(searchBooksByCollection)
    .then((bookcollections) => {
        $scope.bookcollections = bookcollections;
        console.log("book collections", bookcollections);
    });
    // return $scope.searchBooks;
};

$scope.searchBooks2 = function() {
    let searchBooks = document.getElementById("searchBooks").value;
    console.log('hello');
    libraryFactory.getBooksByGenre(searchBooks)
    .then((booksbygenre) => {
        $scope.booksbygenre = booksbygenre;
        console.log("books by genre", booksbygenre);
    });
};

    $scope.searchBooksByAuthor = function() {
        let searchBooksByAuthor = document.getElementById("searchBooksByAuthor").value;
        libraryFactory.getBooksByAuthor(searchBooksByAuthor)
        .then((booksbyauthor) => {
            $scope.booksbyauthor = booksbyauthor;
            console.log("books by author", booksbyauthor);
        });
};

$scope.searchBooksByPublisher = function() {
    let searchBooksByPublisher = document.getElementById("searchBooksByPublisher").value;
    libraryFactory.getBooksByPublisher(searchBooksByPublisher)
    .then((booksbypublisher) => {
        $scope.booksbypublisher = booksbypublisher;
        console.log("books by publisher", booksbypublisher);
    });
};




});