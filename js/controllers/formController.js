angular.module('form')
.controller('formController', function($scope) {

    function init() {
        $scope.card = {
            column: "",
            labels: [],
            title: "",
            description: "",
            dueDate: ""
        };

        $scope.logText = "";
        $scope.file = {};

        $scope.titleBuilder = {
            channels: [],
            tasks: [],
            fbVersion: ""
        };

        $scope.descriptionBuilder = {
            company: "",
            databaseUploaded: false,
            credentialsAdded: false,
            newFeatures: "",
            description: "",
            numbers: "",
            stepsToReproduce: ""
        };

        $scope.labelBuilder = {
            labels: "",
            custom: false,
            standard: false,
            needsToBeValidated: false
        };

        $('.selectpicker').selectpicker('deselectAll');
    }

    init();

    $scope.isEnhancement = function() {
        return $scope.labelBuilder.labels.includes("Enhancement");
    };
    $scope.isBug = function() {
        return $scope.labelBuilder.labels.includes("Bug");
    };
    $scope.isValidate = function() {
        return $scope.labelBuilder.labels.includes("Validate");
    };
    $scope.isNewCustom = function() {
        return $scope.labelBuilder.labels.includes("New Custom");
    };
    $scope.isStandard = function() {
        return $('#standard').is(':checked');
    };
    $scope.isCustom = function() {
        return $('#custom').is(':checked');
    };

    $scope.pasteLogs = false;
    $scope.uploadFile = false;

    //JQUERY

    $('.main').change(function() {
        init();
        $scope.labelBuilder.standard = $('#standard').is(':checked');
        $scope.labelBuilder.custom = $('#custom').is(':checked');
        $scope.$digest();
    });

    //STANDARD PANEL

    $('#standard-subject').change(function () {
        $scope.labelBuilder.labels = $(this).val();
        console.log($scope.labelBuilder.labels);
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

    //CUSTOM PANEL

    $('#custom-subject').change(function () {
        $scope.labelBuilder.labels = $(this).val();
        console.log($scope.labelBuilder.labels);
        $scope.$digest();
    });

    $('#custom-channels').change(function () {
        $scope.titleBuilder.channels = $(this).val();
        console.log($scope.titleBuilder.channels);
    });

    $('#customDbUploaded').change(function () {
        $scope.descriptionBuilder.databaseUploaded = $(this).is(':checked');
        console.log($scope.descriptionBuilder.databaseUploaded);
    });

    $('#customCredsAdded').change(function () {
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

    $('#pasteLogs').change(function() {
       $scope.pasteLogs = $(this).is(':checked');
       $scope.uploadFile = !$(this).is(':checked');
       $scope.$digest();
    });

    $('#uploadFile').change(function() {
        $scope.uploadFile = $(this).is(':checked');
        $scope.pasteLogs = !$(this).is(':checked');
        $scope.$digest();
    });

    //BUG

    $('#needsToBeValidated').change(function () {
       $scope.labelBuilder.needsToBeValidated = $(this).is(':checked');
       console.log($scope.labelBuilder.needsToBeValidated);
    });

    $('#dbUploaded').change(function () {
        $scope.descriptionBuilder.databaseUploaded = $(this).is(':checked');
        console.log($scope.descriptionBuilder.databaseUploaded);
    });

    $('#credsAdded').change(function () {
        $scope.descriptionBuilder.credentialsAdded = $(this).is(':checked');
        console.log($scope.descriptionBuilder.credentialsAdded);
    });

    $('#fileUpload').change(function () {
        $scope.file = $(this).prop('files')[0];
        console.log($scope.file);
    });

    $scope.submit = function() {
        buildTitle();
        buildDescription();
        buildLabels();
    };

    function buildTitle() {
        var builder = $scope.titleBuilder;
        var title = "";

        for (var i = 0; i < builder.channels.length; i++) {
            title += wrap(builder.channels[i]);
            title += " ";
        }
        for (i = 0; i < builder.tasks.length; i++) {
            title += wrap(builder.tasks[i]);
            title += " ";
        }
        if (builder.fbVersion !== "") {
            title += wrap(builder.fbVersion)
        }

        return title;
    }

    function buildDescription() {
        var builder = $scope.descriptionBuilder;
        var description = "";

        if (!isEmpty(builder.company)) {
            description += format(builder.company);
        }
        if (builder.databaseUploaded) {
            description += format("Database uploaded");
        }
        if (builder.credentialsAdded) {
            description += format("Credentials added to spreadsheet");
        }
        if (!isEmpty(builder.description)) {
            description += format(builder.description);
        }
        if (!isEmpty(builder.newFeatures)) {
            description += format(builder.newFeatures);
        }
        if (!isEmpty(builder.stepsToReproduce)) {
            description += format(builder.stepsToReproduce);
        }
        if (!isEmpty(builder.numbers)) {
            description += format(builder.numbers);
        }

        $scope.card.description = description;
    }

    function buildLabels() {
        var builder = $scope.labelBuilder;
        var labels = [];
        var column = "";

        if (builder.custom) {
            labels.push("Custom");
        }
        if (builder.labels.includes("Update")) {
            labels.push("Update");
        }
        if (builder.labels.includes("Bug")) {
            labels.push("Bug");
        }
        if (builder.labels.includes("Enhancement")) {
            labels.push("Enhancement");
        }

        $scope.card.labels = labels;

        if (builder.needsToBeValidated) {
            column = "Validate";
        } else if (labels.includes("Bug")) {
            column = "Bugs";
        } else if (labels.includes("Custom")) {
            column = "Custom";
        } else if (labels.includes("Enhancement")) {
            column = "Enhancements";
        }

        $scope.card.column = column;
    }

    function wrap(str) {
        return "[" + str + "]";
    }

    function format(str) {
        return str + "\n\n";
    }

    function isEmpty(str) {
        return str === "" || str === null;
    }
});