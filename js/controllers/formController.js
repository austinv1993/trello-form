angular.module('form')
.controller('formController', function($scope) {

    $scope.card = {
        board: "Board",
        column: "Column",
        labels: []
    };

    function init() {

    }

    init();

    $scope.setBoard = function(board) {
        $scope.card.board = board;
        if (board === "QA / Implementation") {
            $scope.card.column = "Validate";
        }
    };

    $scope.setColumn = function(column) {
        $scope.card.column = column;
    };

    $('.selectpicker').change(function () {
        $scope.card.labels = $(this).val();
    });

    $scope.isDevelopment = function() {
        return $scope.card.board === "Plugin Development";
    };

    $scope.isQA = function() {
        return $scope.card.board === "QA / Implementation";
    };


});