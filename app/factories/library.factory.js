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
                            genre: currentBook.volumeInfo.category,
                            preview: currentBook.volumeInfo.previewLink
                        };
                        return book;
                    });                        
            
                          return BookObjs;
                          
                };

//this puts all the books from google books api into the books variable.  I use books so I can push the object built above into this so I can get back the things I want.
var books = [];
        const getBooks = function(recommendations){
            
            return $q((resolve, reject) =>{
                $http.get(`https://www.googleapis.com/books/v1/volumes?q=search+terms:${recommendations}`)
                .then((bookArray) => {
                    books = buildBookObjs(bookArray.data.items);
                    console.log('buildBookObjs', buildBookObjs(bookArray.data.items));
                    
                    resolve(books);
                    })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        
        return {getRailsDatabase, getAnswers, getBooks};
    });