// logic in backend
"use strict";

app.factory("userFactory", function(RailsCreds, $q, $http){

    

    const createNewUser = function(user) {

        return $http.post(`${RailsCreds.databaseURL}/users`, {'user':user})
        .then((user) => {
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    };
    var auth_token = "";

    const getToken = function(user) {
        //get method 
        return $q (( resolve, reject) => {
            $http.post(`${RailsCreds.databaseURL}/authenticate`, user)
            .then((data => resolve(data.data.auth_token)));
        });


    };


    
    return {createNewUser, getToken};
});