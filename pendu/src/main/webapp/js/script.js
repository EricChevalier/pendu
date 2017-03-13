var app = angular.module('app', []);

app.controller('myController', function($scope, $http){
	
	var key = "AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
	var keyDistance = "AIzaSyBPuneQRmYuv9QvA5rJSRFuj49a5-tLACA";

	$scope.nbTries = 0;
	$scope.lettersTried = [];
	$scope.victory = false;
	$scope.hangedMan = [];
	$scope.cptHangedMan = 0;

	$scope.connectedUser = sessionStorage.login;
	if($scope.connectedUser){
		$scope.loggedIn = true;
	}

	// Affichage des cartes initiales	
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
			$scope.$apply(function(){
				$scope.display = true;
				$scope.latlonR = position.coords.latitude + "," + position.coords.longitude;
				$scope.latlonL = $scope.latlonR;
			    $scope.mapL = "https://maps.googleapis.com/maps/api/staticmap?center="
			    	+ $scope.latlonL +"&zoom=14&size=500x500&sensor=false&key=" + key;

			    $scope.mapR = "https://maps.googleapis.com/maps/api/staticmap?center="
			    	+ $scope.latlonR +"&zoom=14&size=500x500&sensor=false&key=" + key;

			    calculDistance();
			})
		});
	 } else {
	    $scope.noGeolocation = true;
	}

	// récupération d'un mot aléatoire pour le jeu du pendu
	// $http.get("http://localhost:8080/pendu/rest/mots/get").then(function(response){
	// 		$scope.wordToGuess = response.data;
	// 		$scope.test = response.data;
	// 		// initialisation du mot à compléter
	// 		$scope.hangedWord = "";
	// 		for (var i = 0; i < response.data.length; i++) {
	// 			$scope.hangedWord += "_ ";
	// 		}
			
	// 	})

			$scope.wordToGuess = "azer";
			$scope.test = "azer";
			// initialisation du mot à compléter
			$scope.hangedWord = "";
			for (var i = 0; i < "azer".length; i++) {
				$scope.hangedWord += "_ ";
			}

	// changer la carte de droite (autre joueur)
	$scope.changeCoordRight = function(){
		$scope.latlonR = $scope.latitudeR + "," + $scope.longitudeR;
		$scope.mapR = "https://maps.googleapis.com/maps/api/staticmap?center="
		   + $scope.latlonR + "&zoom=14&size=500x500&sensor=false&key=" + key;
		calculDistance();
		addToStorage($scope.latitudeR, $scope.longitudeR);
	}

	// changer la carte de gauche (joueur actif)
	$scope.changeCoordLeft = function(){
		$scope.latlonL = $scope.latitudeL + "," + $scope.longitudeL;
		$scope.mapL = "https://maps.googleapis.com/maps/api/staticmap?center="
		   + $scope.latlonL + "&zoom=14&size=500x500&sensor=false&key=" + key;
		calculDistance();
		addToStorage($scope.latitudeL, $scope.longitudeL);
	}

	// se connecter
	$scope.log = function(){
		var url = "http://localhost:8080/pendu/rest/login?login=" + $scope.login + "&password=" + $scope.password;

		$scope.loggedIn = true;
		$scope.connectedUser = "toto";

		$http.get(url).then(function(response){
			if(response.data == "ok"){
				validateConnection($scope.login);
				$scope.loggedIn = true;
				sessionStorage.login = $scope.login;
				$scope.connectedUser = sessionStorage.login;
			} else {
				$scope.loggedIn = true;
				$scope.connectedUser = "toto";
			}
		})
	}

	// affichage de la vidéo d'explication des règles
	$scope.displayHelp = function(){
		$scope.displayVideo = true;
	}

	$scope.hideHelp = function(){
		$scope.displayVideo = false;
	}

	// saisie d'une lettre pour le jeu du pendu
	$scope.tryLetter = function(){
		var hangedTab = [];

		// Si la lettre n'a pas déjà été jouée
		if(!$scope.lettersTried.includes($scope.letter) && $scope.victory == false){
			$scope.nbTries ++;
			$scope.lettersTried.push($scope.letter);
			// si la lettre est inclue dans le mot à trouver
			if($scope.wordToGuess.includes($scope.letter)){
				var hangedTab = stringToTab($scope.hangedWord);
				// on parcourt le mot à trouver
				for (var i = 0; i < $scope.wordToGuess.length; i++) {
					// on place les lettres correspondantes dans le mot affiché
					if($scope.wordToGuess[i] == $scope.letter){
						hangedTab[i] = $scope.letter;
					}	
				}
				// maj du mot affiché
				$scope.hangedWord = tabToString(hangedTab);
			} else {
				$scope.hangedMan[$scope.cptHangedMan] = true;
				$scope.cptHangedMan ++;
			}
			
		}
		if($scope.wordToGuess == tabToStringWithoutSpace(hangedTab)){
			$scope.victory = true;
		} else if($scope.cptHangedMan == 11){
			$scope.defeat = true;
		}		
	}

	//réinitialisation du pendu
	$scope.reset = function(){
		$scope.victory = false;
		$scope.nbTries = 0;
		$scope.letter = "";
		$scope.lettersTried = [];

		// récupération d'un mot aléatoire pour le jeu du pendu
		// $http.get("http://localhost:8080/pendu/rest/mots/get").then(function(response){
		// 		$scope.wordToGuess = response.data;
		// 		$scope.test = response.data;
		// 		// initialisation du mot à compléter
		// 		$scope.hangedWord = "";
		// 		for (var i = 0; i < response.data.length; i++) {
		// 			$scope.hangedWord += "_ ";
		// 		}
				
		// 	})

		$scope.wordToGuess = "try";
		$scope.test = "try";
		// initialisation du mot à compléter
		$scope.hangedWord = "";
		for (var i = 0; i < "try".length; i++) {
			$scope.hangedWord += "_ ";
		}


	}

/*  ------------------------------------
	Fonctions utilitaires
    ------------------------------------  */

	var calculDistance = function(){
		
	var urlCar = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + $scope.latlonL 
			+ "&destinations=" + $scope.latlonR + "&key=" + keyDistance + "&mode=driving";
		$http.get(urlCar).then(function(response){
			$scope.distanceCar = response.data.rows[0].elements[0].distance.text;
			$scope.durationCar = response.data.rows[0].elements[0].duration.text;
		})

	var urlWalk = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + $scope.latlonL 
			+ "&destinations=" + $scope.latlonR + "&key=" + keyDistance + "&mode=walking";
		$http.get(urlWalk).then(function(response){
			$scope.distanceWalk = response.data.rows[0].elements[0].distance.text;
			$scope.durationWalk = response.data.rows[0].elements[0].duration.text;
		})

	var urlBike = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + $scope.latlonL 
			+ "&destinations=" + $scope.latlonR + "&key=" + keyDistance + "&mode=bicycling";
		$http.get(urlBike).then(function(response){
			$scope.distanceBike = response.data.rows[0].elements[0].distance.text;
			$scope.durationBike = response.data.rows[0].elements[0].duration.text;
		})
}
});