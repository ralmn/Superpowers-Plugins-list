(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ralmn/Developpement/SiteWeb/sp-plugins-list/angular/app.js":[function(require,module,exports){
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


},{"./controller/main.js":"/home/ralmn/Developpement/SiteWeb/sp-plugins-list/angular/controller/main.js","./controller/view.js":"/home/ralmn/Developpement/SiteWeb/sp-plugins-list/angular/controller/view.js"}],"/home/ralmn/Developpement/SiteWeb/sp-plugins-list/angular/controller/main.js":[function(require,module,exports){
module.exports = function($scope, $http, SupCache){
	$http.get('./plugins.json?' + Date.now())
		.success(function(data, source, headers, config){
			$scope.plugins = data;
			SupCache.put('plugins', data);
		})
}
},{}],"/home/ralmn/Developpement/SiteWeb/sp-plugins-list/angular/controller/view.js":[function(require,module,exports){
module.exports = function($scope, $route, SupCache, $http){
	params = $route.current.params;
	console.log(params);

	plugins = SupCache.get('plugins');
	if(plugins){
		updateContent(plugins);
	}else{
		$http.get('./plugins.json?' + Date.now()).success(function(data){
			updateContent(data);
		})
	}
	
	function updateContent(plugins){
		plugin = null;
		for(i in plugins){
			plug = plugins[i];
			if(plug.name == params.name && plug.author==params.author){
				plugin = plug;
				break;
			}
		}
		console.log(plugin);
		$scope.plugin = plugin;

		$http.get("http://nsgc.ralmn.fr/corps.php?url=" + plugin["readmeLink"]).success(function(data){
			$scope.readmeContent = data;
		})
	}


}
},{}]},{},["/home/ralmn/Developpement/SiteWeb/sp-plugins-list/angular/app.js"]);
