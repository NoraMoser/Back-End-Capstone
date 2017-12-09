

// bring in questions and drop downs with answers.  Responses sent to the responses table. 
// Logic to attach tags to specific responses
'use strict';

console.log('questionnaire.ctrl');

app.controller('questionnaireCtrl', function(libraryFactory, $routeParams, $scope) {


    $scope.questions = [];
    $scope.answers = [];
    $scope.books = [];
    
    
    //this shows all my questions from the database and puts them into an array that I can use on the partial.
    const showAllQuestions = function () {
        libraryFactory.getRailsDatabase()
        .then((questions) => {
            $scope.questions = questions;
        });
    };
    
    //This is the same as above
    const getAnswers = function () {
        libraryFactory.getAnswers()
        .then((answers) => {
            $scope.answers = answers;  
            // console.log($scope.questions);          
            console.log("answers", answers);
        }); 
    };

    //This gets all the books from the google books api and puts them into a scoped array so I can use it on the partial.
    const getRecommendations = function() {
        libraryFactory.getBooks()
        .then((books) => {
            $scope.books = books;
            console.log("books", books);
        });
    };

   
    getRecommendations();
    showAllQuestions();
    getAnswers();

});