// logic in backend
"use strict";

app.factory("userFactory", function(RailsCreds, $q, $http){

    

    const getUsers = function(user) {
        return $q( (resolve, reject) => {
            $http.get(`${RailsCreds.databaseURL}/users`, {headers: 
                {
                    Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwiZXhwIjoxNTEzMzUyNDU2fQ.7csyWnWdteAJehY1kpi7oOcsTvlPYoWj4SSPggwMhIg',
                },
            })
            .then((itemObject) => {
                console.log("initial data from user factory", itemObject);
                let itemCollection = itemObject.data;
                resolve(itemCollection);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    
    
    //this allows a user to sign up for the app
    const createNewUser = function(user) {
        
        return $http.post(`${RailsCreds.databaseURL}/users`, {'user':user})
        .then((user) => {
            user_id = user.data.id;
            console.log("user from create user", user_id);
        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    };
    
    
    var auth_token = "";
    var user_id;
//this gets the token for authentication and saves the auth token (above) and the current user id (above) and sets them to a variable.

    const getToken = function(user) {
        return $q (( resolve, reject) => {
            $http.post(`${RailsCreds.databaseURL}/authenticate`, user)
            .then((data => {
                auth_token = data.data.auth_token;
                user_id = data.data.user_id;
                console.log("data from auth token", data);
                console.log("current user id", user_id);
                resolve(data.data.auth_token);
            })
            );
        });
    };

    const logOut = function() {
        auth_token = 0;
    };
    
    const getTokenBack = function() {
        return auth_token;
    };

    const getCurrentUser = function() {
        return user_id;
    };


    
    return {createNewUser, getToken, getTokenBack, getCurrentUser, logOut, getUsers};
});