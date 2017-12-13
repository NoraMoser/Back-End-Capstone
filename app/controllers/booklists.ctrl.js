// This will have logic to take books from recommendations and save them to the to-read list
// This will also have logic to take books from to-read and put them into has read
// This will also have logic to delete books from either list
'use strict';

console.log('booklists.ctrl');

app.controller('listCtrl', function($routeParams, $scope, libraryFactory, userFactory) {
    
    $scope.toread = [];

    $scope.sendUserBooks = function(book) {
        book.cover_photo = book.image;
        book.author = book.authors[0];
        book.rating = 'NULL';
        book.has_read = 'false';
        book.book_title = book.title;
        book.user_id = userFactory.getCurrentUser();
        libraryFactory.sendBooks(book);
    };

    const getToReadBooks = function () {
        libraryFactory.getToRead()
        .then((userbooks) => {
            $scope.toread = userbooks;  
            // console.log($scope.questions);          
        }); 
    };

    $scope.sendHasReadBooks = function(book) {
        book.has_read = 'true';
        libraryFactory.sendBooks(book);
    };

    this.selStars = 0; // initial stars count
    this.maxStars = 5;

    this.getStarArray = function() {
      var result = [];
      for (var i = 1; i <= this.maxStars; i++)
        result.push(i);
      return result;
    };

    this.getClass = function(value) {
      return 'glyphicon glyphicon-star' + (this.selStars >= value ? '' : '-empty');
    };

    this.setClass = function(sender, value) {
      this.selStars = value;
      sender.currentTarget.setAttribute('class', this.getClass(value));
    };

    $scope.ratings = {
        rating: "",
    };

    $scope.changeUserRating = function(id, rating) {
        let newRating = JSON.stringify(rating);
        
        console.log("rating", rating);
        console.log("id", id);
        $scope.ratings.rating = newRating;
        libraryFactory.editUserBooks(id, $scope.ratings);
    };

  

    getToReadBooks();
});
    