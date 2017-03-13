var app = angular.module('app', []);

app.controller('myController', function($scope, $http){

	$scope.connectedUser = sessionStorage.login;
	if($scope.connectedUser){
		$scope.loggedIn = true;
	}

});