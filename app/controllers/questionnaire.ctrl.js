

// bring in questions and drop downs with answers.  Responses sent to the responses table. 
// Logic to attach tags to specific responses
'use strict';

console.log('questionnaire.ctrl');

app.controller('questionnaireCtrl', function(libraryFactory, $routeParams, $scope) {


    $scope.questions = [];
    $scope.answers = [];
    $scope.books = [];
    
    
    
    const showAllQuestions = function () {
        libraryFactory.getRailsDatabase()
        .then((questions) => {
            $scope.questions = questions;
        });
    };
    
    const getAnswers = function () {
        libraryFactory.getAnswers()
        .then((answers) => {
            $scope.answers = answers;  
            // console.log($scope.questions);          
            console.log("answers", answers);
        }); 
    };

    const getRecommendations = function() {
        libraryFactory.getBooks()
        .then((books) => {
            $scope.books = books;
            console.log("books", books);
        });
    };

    // $scope.searchTerm="";
    // const searchBook = function(){
    //     console.log('search book', $scope.searchTerm);
    //     libraryFactory.getBooks($scope.searchTerm)
    //     .then((results) => {
    //         $scope.display(results);
        
    // });
    // };



//  const display = (results)=>{
//     console.log('results', results);
//     $scope.bookies = results;
// };
    getRecommendations();
    showAllQuestions();
    getAnswers();
    
    // libraryFactory.getRailsDatabase()
    // .then(data => console.log(data));
});