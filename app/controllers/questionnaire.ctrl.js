

// bring in questions and drop downs with answers.  Responses sent to the responses table. 
// Logic to attach tags to specific responses
'use strict';

console.log('questionnaire.ctrl');

app.controller('questionnaireCtrl', function(libraryFactory, $routeParams, $scope, userFactory) {




    $scope.questions = [];
    // $scope.answers = [];
    $scope.books = [];

    
    

    $scope.data = {
        responses: {},
        answers: [
          {id: '1', name: 'Option A'},
          {id: '2', name: 'Option B'},
          {id: '3', name: 'Option C'}
        ]
       };
    
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
            $scope.data.answers = answers;  
            // console.log($scope.questions);          
            console.log("answers", answers);
        }); 
    };

    //This gets all the books from the google books api and puts them into a scoped array so I can use it on the partial.
    const getRecommendations = function() {
        libraryFactory.getBooks('Potter')
        .then((books) => {
            $scope.books = books;
            console.log("books", books);
        });
    };
   

    const parseResponses = (obj) => {
        // turn the answer_ids to integers
        let objArray = Object.keys(obj).map(response => {
            let tempObj = {
               question_id: parseInt(response),
                user_id: userFactory.getCurrentUser(),
                answer_id: parseInt(obj[response]),
            };
            // console.log("response object", $scope.responseObject);
            return tempObj;
        });
        
        console.log("obj array", objArray);
         return objArray;
    };

    $scope.sendResponses = function() {
        let parsedResponses = parseResponses($scope.data.responses);
        console.log("responses", parsedResponses);
        libraryFactory.sendResponses(parsedResponses)
        .then((questionResponses) => {
            console.log("question responses", questionResponses);
        });
    };
  
    showAllQuestions();
    getAnswers();

});