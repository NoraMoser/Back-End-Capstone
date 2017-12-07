// login stuff here
'use strict';

console.log('initial.ctrl');

app.controller('initialCtrl', function($routeParams, $scope, userFactory) {

    $scope.user = {
        email: "",
        password: ""
    };

    $scope.login = function() {
        $scope.checkEmail = document.getElementById("emailLogin").value;
        $scope.checkPassword = document.getElementById("passwordLogin").value;
        $scope.user.email = $scope.checkEmail;
        $scope.user.password = $scope.checkPassword;

        userFactory.getToken($scope.user)
        .then(auth_token => {
            $scope.user.auth_token = auth_token;
            console.log('$scope.user', $scope.user);
        });




    };
});