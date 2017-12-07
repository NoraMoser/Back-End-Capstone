// This will have logic to take information from the sign up form and send it to the database.
'use strict';

console.log('form.ctrl');

app.controller('formCtrl', function(userFactory, $routeParams, $scope, $window) {

    
//This is the object that the values are being pushed to and sent to the database
    $scope.user = {
        admin: "",
        first_name: "",
        last_name: "",
        grade_level: "",
        email: "",
        password: ""
    };
//This sets the values of the form and puts it in an object to send to my database
    $scope.createUser = function(){
        $scope.trueAdminForm = document.getElementById("trueButton");
        $scope.falseAdminForm = document.getElementById("falseButton");
        $scope.fnForm = document.getElementById("firstNameForm").value;
        $scope.lnForm = document.getElementById("lastNameForm").value;
        $scope.glForm = document.getElementById("gradeLevelForm").value;
        $scope.emailForm = document.getElementById("emailForm").value;
        $scope.passwordForm = document.getElementById("passwordForm").value;
//This makes either true or false for radio buttons go to database
        if($scope.trueAdminForm.checked) { 
        $scope.user.admin = 'true';
        } else {
        $scope.user.admin = 'false';
        }
        $scope.user.first_name = $scope.fnForm;
        $scope.user.last_name = $scope.lnForm;
        $scope.user.grade_level = $scope.glForm;
        $scope.user.email = $scope.emailForm;
        $scope.user.password = $scope.passwordForm;

        //This sends it to the database using post in the user factory
        userFactory.createNewUser($scope.user);

        $window.location.href = "#!/";
        
    };

});