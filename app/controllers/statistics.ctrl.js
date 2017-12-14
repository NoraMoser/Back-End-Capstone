// Logic where stats show up by grade- most popular recommended books, most highly rated by grade, etc...
'use strict';

console.log('statistics.ctrl');

app.controller('statisticsCtrl', function($routeParams, $scope, libraryFactory, userFactory, $route) {

    $scope.highrate = [];

    const getHigherRatedBooks = function () {
        libraryFactory.getToRead()
        .then((userbooks) => {
            $scope.highrate = userbooks;  
        }); 
    };
    $scope.deleteBooks = function(id) {
        libraryFactory.deleteBooks(id)
        .then((taco) => {
            $route.reload();
        });
    };
    getHigherRatedBooks();

});
