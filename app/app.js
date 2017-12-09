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

    .when('/to-read', {
        templateUrl: 'partials/booklist.html',
        controller: 'listCtrl'
    })

    .when('/has-read', {
        templateUrl: 'partials/has-read.html',
        controller: 'listCtrl'
    })

    .when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'listCtrl'
    })
    
    .otherwise('/');
});
