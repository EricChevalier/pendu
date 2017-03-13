var addToStorage = function(latitude, longitude){
	var date = getDate();
	var data = {date: date, latitude: latitude, longitude: longitude};
	if(localStorage.latlonTab){
		var tab = angular.fromJson(localStorage.latlonTab);
	} else {
		var tab = [];
	}
	tab.push(data);
	localStorage.latlonTab = angular.toJson(tab);
}

var getDate = function(){
	var date = new Date();

	var hh = date.getHours();
	var mm = date.getMinutes();
	var dd = date.getDate();
	var MM = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();
	if(mm < 10){
	    mm = '0' + mm;
	}
	if(hh < 10){
	    hh = '0' + hh;
	}
	if(dd < 10){
	    dd = '0' + dd;
	} 
	if(MM < 10){
	    MM = '0' + MM;
	} 
	return hh + ':' + mm + ' ' + dd+'/'+MM+'/'+yyyy;
}

var validateConnection = function(login){
	sessionStorage.login = login;
}

var stringToTab = function(string){
	var res = string.split(" ");
	res.pop();
	return res;
}

var tabToString = function(tab){
	var res = "";
	for (var i = 0; i < tab.length; i++) {
		res += tab[i] + " ";
	}
	return res;
}

var tabToStringSsEspace = function(tab){
	var res = "";
	for (var i = 0; i < tab.length; i++) {
		res += tab[i];
	}
	return res;
}