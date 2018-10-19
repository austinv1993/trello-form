var app = angular.module('form', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('form', {
				url: '/form',
				controller: 'formController',
				templateUrl: './views/form.html'
		});

    $urlRouterProvider.otherwise('/form')

});