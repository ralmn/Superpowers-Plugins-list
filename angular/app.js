var angularApp = angular.module("SPPluginsApp", ['ngRoute', 'ngSanitize','btford.markdown']);

angularApp.config(function($routeProvider, $httpProvider){
	$routeProvider.when('/', {controller:"MainController", templateUrl:"partials/main.html"})
	$routeProvider.when('/plugin/:name/:author', {controller:"ViewController", templateUrl:"partials/view.html"})
	.otherwise("/");
	delete $httpProvider.defaults.headers.common['X-Requested-With'];	
})

angularApp.controller('MainController', require('./controller/main.js'));
angularApp.controller('ViewController', require('./controller/view.js'));
angularApp.factory('SupCache', function($cacheFactory){
	return $cacheFactory('superpower-plugins');
});

