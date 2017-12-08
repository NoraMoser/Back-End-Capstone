'use strict';
console.log('app.js');

const app = angular.module("LibraryApp", ["ngRoute"]);

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/initial.html',
        controller: 'initialCtrl'
    })

    .when('/questionnaire', {
        templateUrl: 'partials/questionnaire.html',
        controller: 'questionnaireCtrl'
        // resolve: {isAuth}
    })

    .when('/form', {
        templateUrl: 'partials/signupform.html',
        controller: 'formCtrl'
    })
    
    .otherwise('/');
});
