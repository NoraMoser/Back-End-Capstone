// login stuff here
'use strict';

console.log('initial.ctrl');

app.controller('initialCtrl', function($routeParams, $scope, userFactory, $window) {

    $scope.user = {
        email: "",
        password: "",
    };

    $scope.adminLoginTruthy = 0;

    
//this allows login with the auth token- if the user has an auth token, they are sent to the next page.  if not, an alert shows up.
    $scope.login = function() {
        $scope.checkEmail = document.getElementById("emailLogin").value;
        $scope.checkPassword = document.getElementById("passwordLogin").value;
        $scope.user.email = $scope.checkEmail;
        $scope.user.password = $scope.checkPassword;

        userFactory.getToken($scope.user)
        .then(auth_token => {
            $scope.user.auth_token = auth_token;
            console.log('auth_token', auth_token);
            if(auth_token) {
                $window.location.href = "#!/questionnaire";
                }else{
                    alert('you are not a user!');
                }
        });

    };

    
    
    
});