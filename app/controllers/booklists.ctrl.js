// This will have logic to take books from recommendations and save them to the to-read list
// This will also have logic to take books from to-read and put them into has read
// This will also have logic to delete books from either list
'use strict';

console.log('booklists.ctrl');

app.controller('listCtrl', function($routeParams, $scope, libraryFactory, userFactory, $route) {
    
    $scope.toread = [];
//this is posting to the user_books table by passing in the object in the html.

    $scope.sendQuestionnaireBooks = function(book) {
        book.cover_photo = book.cover_photo;
        book.author = book.author;
        book.has_read = 'false';
        book.book_title = book.book_title;
        book.user_id = userFactory.getCurrentUser();
        libraryFactory.sendBooks(book);
    };

    $scope.sendUserBooks = function(book) {
        book.cover_photo = book.image;
        book.author = book.authors;
        // book.rating = 'NULL';
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
//this changes has_read to true after user clicks that they have read the book.
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
//this changes the users rating after they click on the stars in the has-read page. I am sending an object (above), and the id and rating being passed are in the html.
    $scope.changeUserRating = function(id, rating) {
        let newRating = JSON.stringify(rating);
        
        console.log("rating", rating);
        console.log("id", id);
        $scope.ratings.rating = newRating;
        libraryFactory.editUserBooks(id, $scope.ratings);
    };

    $scope.deleteBooks = function(id) {
        libraryFactory.deleteBooks(id)
        .then((taco) => {
            $route.reload();
        });
    };

    $scope.logOut = function() {
        userFactory.logOut();
    };

  

    getToReadBooks();
});
    