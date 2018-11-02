angular.module('form')
.service('trelloService', function($http) {

    this.create = function(card, needsToBeValidated) {
        return $http.post('https://api.trello.com/1/cards?key=' + auth.key + '&token=' + auth.token, card)
            .then(function(response) {
                if (response.status === 200) {
                    var id = response.data.id;
                    var name = card.name + " [" + response.data.idShort + "]";
                    var idList = needsToBeValidated ? $scope.getListId("Validate") : card.idList;

                    $http.put('https://api.trello.com/1/cards/' + id + '?key=' + auth.key + '&token=' + auth.token + '&idList=' + idList + '&name=' + name, null)
                        .then(function(response) {
                            return response;
                        });
                } else {
                    return response;
                }
            })
    };

    this.update = function(id, name) {
        return $http.put('https://api.trello.com/1/cards/' + id + '?key=' + auth.key + '&token=' + auth.token + '&name=' + name, null)
            .then(function(response) {
                return response;
            })
    };

    this.validate = function (card) {
        if(!card.name || card.name === "") {
            console.log("Post title required");
            return false;
        }
        if(!card.body || card.body === "") {
            console.log("Post body required");
            return false;
        }
        return true;
    };

    var auth = {
        key: "e4fb7b29ec32b9a53815e2b15debd938",
        token: "75cc03520e907ff19d39740fbe3b82489950464974b50c2b656a7ce3916c3091"
    };

    var lists = [
        {
            id: "591f0e3cd6adf63b58af1791",
            name: "Custom"
        },
        {
            id: "5a6f8faed0d506132966a69c",
            name: "Bugs"
        },
        {
            id: "5b6db306bf0a6810c15b1f3d",
            name: "Enhancements"
        },
        {
            id: "5adfaabf6394e53f081b874c",
            name: "Validate"
        }
    ];

    this.getListId = function(listName) {
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].name === listName) {
                return lists[i].id;
            }
        }
    };

    var labels = [
        {
            id: "591e6309ced82109ffaf7878",
            name: "Custom Plugin",
            isDevelopmentBoard: true

        },
        {
            id: "591e6333ced82109ffaf78b4",
            name: "Enhancement",
            isDevelopmentBoard: true

        },
        {
            id: "5a4d0d1843342f42e8a5959c",
            name: "Troubleshoot",
            isDevelopmentBoard: true

        },
        {
            id: "591e6309ced82109ffaf7879",
            name: "Release",
            isDevelopmentBoard: true

        },
        {
            id: "5ae0b28578fb3464b4765137",
            name: "Pending Conversation",
            isDevelopmentBoard: true

        },
        {
            id: "5993344a1314a339991ad69e",
            name: "Update",
            isDevelopmentBoard: true

        },
        {
            id: "5bc89b0251d8f735bae4de08",
            name: "Bug",
            isDevelopmentBoard: true

        },
        {
            id: "5afb4a241bfac3e6449cbc83",
            name: "Bug",
            isDevelopmentBoard: false
        },
        {
            id: "5afb4a241bfac3e6449cbd0d",
            name: "Custom Plugin",
            isDevelopmentBoard: false
        }
    ];

    this.getLabelId = function(labelName, isDevelopmentBoard) {
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].name === labelName && isDevelopmentBoard !== labels[i].isDevelopmentBoard) {
                return labels[i].id;
            }
        }
    };

});