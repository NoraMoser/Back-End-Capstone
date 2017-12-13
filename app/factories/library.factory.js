// submit call to rails api to get questions/answers post responses and call to goodreads on save send what user wants to save to rails
'use strict';

console.log('library.factory');

app.factory("libraryFactory", function($q, $http, $injector, userFactory, RailsCreds){
    
    
        const getRailsDatabase = function(user){
            return $q( (resolve, reject) => {
                $http.get(`${RailsCreds.databaseURL}/questions`, {headers: 
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

        const getAnswers = function(user){
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

        const sendResponses = function(responses) {
            
            // let responseString = angular.toJson(responses);
            // console.log(responseString);
            return $q( (resolve, reject) => {
            $http.post(`${RailsCreds.databaseURL}/responses`, {'responses':responses}, {headers: 
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

        //This builds the book object with all of the keys that I want to use for my questionnaire.
        const buildBookObjs = function(data){
            
                    let BookObjs =  data.map(function(currentBook){   
                        console.log("current book", currentBook);                     
                        let book =  {
                            id: currentBook.id,
                            authors: currentBook.volumeInfo.authors,
                            image: currentBook.volumeInfo.imageLinks.thumbnail,
                            title: currentBook.volumeInfo.title,
                            description: currentBook.volumeInfo.description,
                            link: currentBook.volumeInfo.canonicalVolumeLink,
                            pageNum: currentBook.volumeInfo.pageCount,
                            rating: currentBook.volumeInfo.averageRating,
                            published: currentBook.volumeInfo.publishedDate,
                            genre: currentBook.volumeInfo.categories,
                            preview: currentBook.volumeInfo.previewLink
                        };
                        return book;
                    });                        
            
                          return BookObjs;
                          
                };

//this puts all the books from google books api into the books variable.  I use books so I can push the object built above into this so I can get back the things I want.
var books = [];
        const getBooksByGenre = function(recommendations){
            // search+terms:
            return $q((resolve, reject) =>{
                $http.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${recommendations}`)
                .then((bookArray) => {
                    books = buildBookObjs(bookArray.data.items);
                    console.log('buildBookObjs', buildBookObjs(bookArray.data.items));
                    console.log("book array", bookArray);
                    resolve(books);
                    })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        //these next few gets are searches that the google books api allows- author, subje ct, publisher, etc then I'm saving them to a variable so I can use them in the resolve. My objects are saved to the variabes. 
        var booksByAuthor = [];
        const getBooksByAuthor = function(author){
            return $q((resolve, reject) =>{
                $http.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`)
                .then((bookArray) => {
                    booksByAuthor = buildBookObjs(bookArray.data.items);
                    // console.log('buildBookObjs', buildBookObjs(bookArray.data.items));
                    console.log("author book array", bookArray);
                    resolve(booksByAuthor);
                    })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        var booksByPublisher = [];
        const getBooksByPublisher = function(publisher){
            return $q((resolve, reject) =>{
                $http.get(`https://www.googleapis.com/books/v1/volumes?q=inpublisher:${publisher}`)
                .then((bookArray) => {
                    booksByPublisher = buildBookObjs(bookArray.data.items);
                    // console.log('buildBookObjs', buildBookObjs(bookArray.data.items));
                    console.log("author book array", bookArray);
                    resolve(booksByPublisher);
                    })
                .catch((error) => {
                    reject(error);
                });
            });
        };
//this saves books to the database.
        const sendBooks = function(books) {
            let newBook = JSON.stringify(books);
           
            return $http.post(`${RailsCreds.databaseURL}/user_books`, newBook, {headers: 
                {
                    Authorization: `${userFactory.getTokenBack()}`,
                },
            })
            .then((data) => {
                // let itemCollection = itemObject.data;
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
                 });
        };
//This gets books back from the user_books table so that I can display them on the book lists.
        const getToRead = function(user) {
            return $q( (resolve, reject) => {
                $http.get(`${RailsCreds.databaseURL}/user_books`, {headers: 
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

        //this edits the rating when the user adds a star and clicks the finish button.
        const editUserBooks = function(id, rating) {
            console.log("id and obj to update", id, rating);
            return $q((resolve, reject) => {
                // let newObj = JSON.stringify(rating);
                $http.patch(`${RailsCreds.databaseURL}/user_books/${id}`, {'user_book':rating}, {headers: 
                    {
                        Authorization: `${userFactory.getTokenBack()}`,
                    },
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };


        

        
        return {getRailsDatabase, getAnswers, getBooksByGenre, sendResponses, buildBookObjs, getBooksByAuthor, getBooksByPublisher, sendBooks, getToRead, editUserBooks};
    });