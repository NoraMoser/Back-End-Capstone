// Logic where stats show up by grade- most popular recommended books, most highly rated by grade, etc...
'use strict';

console.log('statistics.ctrl');

app.controller('statisticsCtrl', function($routeParams, $scope, libraryFactory, userFactory, $route) {

    $scope.highrate = [];
    $scope.to_buy = {
        to_buy: "true",
    };
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

    $scope.sendToBuyBooks = function(id, to_buy) {
        let newBuy = JSON.stringify(to_buy);
        console.log("to_buy", to_buy);
        

        $scope.to_buy.to_buy = newBuy;
        libraryFactory.editUserBooks(id, $scope.to_buy);
    };


    getHigherRatedBooks();

});
