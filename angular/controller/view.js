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