angular.module('form')
.controller('formController', function($scope) {

    $scope.card = {
        board: "Board",
        column: "Column",
        labels: [],
        description: "",
        title: "",
        dueDate: ""
    };

    $scope.titleBuilder = {
        fbVersion: "",
        title: "",
        channels: []
    };

    $scope.descriptionBuilder = {
        tasks: [],
        company: "",
        databaseUploaded: false,
        credentialsAdded: false,
        description: "",
        stepsToReproduce: ""
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


    $scope.isDevelopment = function() {
        return $scope.card.board === "Plugin Development";
    };

    $scope.isQA = function() {
        return $scope.card.board === "QA / Implementation";
    };

    $scope.isEnhancement = function() {
       return $scope.card.labels.includes("Enhancement");
    };
    $scope.isBug = function() {
        return $scope.card.labels.includes("Bug");
    };
    $scope.isValidate = function() {
        return $scope.card.labels.includes("Validate");
    };
    $scope.isResearch = function() {
        return $scope.card.labels.includes("Research");
    };

    $scope.isStandard = function() {
        return $('#standard').is(':checked');
    };

    //JQUERY

    $('.radio').change(function() {
        $scope.$digest();
    });

    //STANDARD

    $('#standard-subject').change(function () {
        $scope.card.labels = [];
        var subject = $(this).val();
        $scope.card.labels.push(subject);
        console.log($scope.card.labels);
        $scope.$digest();
    });

    $('#standard-channels').change(function () {
        $scope.titleBuilder.channels = $(this).val();
        console.log($scope.titleBuilder.channels);
    });

    $('#standard-tasks').change(function () {
        $scope.descriptionBuilder.tasks = $(this).val();
        console.log($scope.descriptionBuilder.tasks)
    });

    $('#dbUploaded').change(function () {
        $scope.descriptionBuilder.databaseUploaded = $(this).is(':checked');
        console.log($scope.descriptionBuilder.databaseUploaded);
    });

    $('#credsAdded').change(function () {
        $scope.descriptionBuilder.credentialsAdded = $(this).is(':checked');
        console.log($scope.descriptionBuilder.credentialsAdded);
    });

    $('#datepicker').datepicker({
        format: 'mm/dd/yyyy',
        todayHighlight:'TRUE',
        autoclose: true,
        clearBtn: true
    }).on('changeDate', function (e) {
        $scope.card.dueDate = e.format().toString();
        console.log($scope.card.dueDate);
    });

});