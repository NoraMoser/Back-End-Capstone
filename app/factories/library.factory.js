// submit call to rails api to get questions/answers post responses and call to goodreads on save send what user wants to save to rails
'use strict';

console.log('library.factory');

app.factory("libraryFactory", function($q, $http, $injector, userFactory, RailsCreds){
    
    
        const getRailsDatabase = function(user){
            return $q( (resolve, reject) => {
                $http.get(`${RailsCreds.databaseURL}/answers`, {headers: 
                    {
                        Authorization: `${userFactory.getTokenBack()}`,
                    },
                })
                .then((itemObject) => {
                    let itemCollection = itemObject.data;
                    resolve(itemCollection);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        };

        
        return {getRailsDatabase};
    });