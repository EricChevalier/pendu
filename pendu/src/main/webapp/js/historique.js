var app = angular.module('app', []);

app.controller('myController', function($scope, $http){

	$scope.latlonTab = angular.fromJson(localStorage.latlonTab);

	if($scope.latlonTab){
		$scope.display = true;
	}

});