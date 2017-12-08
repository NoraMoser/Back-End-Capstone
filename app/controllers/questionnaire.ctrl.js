// bring in questions and drop downs with answers.  Responses sent to the responses table. 
// Logic to attach tags to specific responses
'use strict';

console.log('questionnaire.ctrl');

app.controller('questionnaireCtrl', function(libraryFactory, $routeParams, $scope) {


    $scope.questions = [];
    //let user = authFactory.getCurrentUser();
    //$rootScope.showSearch = true;
    //$scope.searchText = filterFactory;

    const showAllQuestions = function () {
        libraryFactory.getRailsDatabase()
        .then((questions) => {
            $scope.questions = questions;
        });
    };


    showAllQuestions();

    libraryFactory.getRailsDatabase()
    .then(data => console.log(data));
});