angular.module('form')
.service('trelloService', function($http) {

    this.create = function(card) {
        return $http.post('http://localhost:3000/api/posts', card)
            .then(function(response) {
                return response;
            })
    };

    this.update = function(card) {
        return $http.put('http://localhost:3000/api/posts', card)
            .then(function(response) {
                return response;
            })
    };

    this.validate = function (card) {
        if(!card.title || card.title === "") {
            console.log("Post title required");
            return false;
        }
        if(!card.body || card.body === "") {
            console.log("Post body required");
            return false;
        }
        return true;
    };

});