angular.module('form')
.controller('formController', function($scope, trelloService) {

    function init() {
        $scope.card = {
            idLabels: [],
            name: "",
            desc: "",
            due: "",
            idList: ""
        };

        $scope.logText = "";
        $scope.file = {};

        $scope.titleBuilder = {
            channels: [],
            tasks: [],
            fbVersion: "",
            company: ""
        };

        $scope.descriptionBuilder = {
            databaseUploaded: false,
            credentialsAdded: false,
            newFeatures: "",
            desc: "",
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
        $('.form-check-input').prop('checked', false)
    }

    $scope.submit = function() {
        buildTitle();
        buildDescription();
        buildLabels();
        trelloService.create($scope.card, $scope.labelBuilder.needsToBeValidated);
        init();

    };

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
        $scope.titleBuilder.tasks = $(this).val();
        console.log($scope.titleBuilder.tasks)
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

    $('#custom-tasks').change(function () {
        $scope.titleBuilder.tasks = $(this).val();
        console.log($scope.titleBuilder.tasks)
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
        $scope.card.due = e.format().toString();
        console.log($scope.card.due);
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

    function buildTitle() {
        var builder = $scope.titleBuilder;
        var title = "";

        if (!isEmpty(builder.company)) {
            title += wrap(builder.company);
            title += " ";
        }

        for (var i = 0; i < builder.channels.length; i++) {
            title += wrap(builder.channels[i]);
            title += " ";
        }
        for (i = 0; i < builder.tasks.length; i++) {
            title += wrap(builder.tasks[i]);
            title += " ";
        }
        if (!isEmpty(builder.fbVersion)) {
            title += wrap(builder.fbVersion);
        }

        $scope.card.name = title;
    }

    function buildDescription() {
        var builder = $scope.descriptionBuilder;
        var description = "";

        if (builder.databaseUploaded) {
            description += format("Database uploaded");
        }
        if (builder.credentialsAdded) {
            description += format("Credentials added to spreadsheet");
        }
        if (!isEmpty(builder.desc)) {
            description += format(builder.desc);
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

        $scope.card.desc = description;
    }

    function buildLabels() {
        var builder = $scope.labelBuilder;
        var labelNames = [];
        var labelIds = [];
        var listName = "";

        if (builder.custom) {
            labelNames.push("Custom Plugin");
        }
        if (builder.labels.includes("Update")) {
            labelNames.push("Update");
        }
        if (builder.labels.includes("Bug")) {
            labelNames.push("Bug");
        }
        if (builder.labels.includes("Enhancement")) {
            labelNames.push("Enhancement");
        }

        for (var i = 0; i < labelNames.length; i++) {
            labelIds.push(trelloService.getLabelId(labelNames[i], builder.needsToBeValidated));
        }

        $scope.card.idLabels = labelIds;

        if (builder.needsToBeValidated) {
            listName = "Bugs";
        } else if (labelNames.includes("Bug")) {
            listName = "Bugs";
        } else if (labelNames.includes("Custom Plugin")) {
            listName = "Custom";
        } else if (labelNames.includes("Enhancement")) {
            listName = "Enhancements";
        }

        $scope.card.idList = trelloService.getListId(listName);
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