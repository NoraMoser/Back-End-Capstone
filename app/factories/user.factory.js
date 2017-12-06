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
    return {createNewUser};
});