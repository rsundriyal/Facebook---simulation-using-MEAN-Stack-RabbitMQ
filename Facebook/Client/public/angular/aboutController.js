var about = angular.module('about', []);
console.log("out of angular about");
about.controller('about', function($scope, $http) {
	console.log("in angular about");
	$scope.invalid_about = true;
	$scope.about = function() {
		console.log("yahi hun");
		$http({
			method : "POST",
			url : '/userAbout?name=' + $scope.name
			+ '&city=' + $scope.city + '&current='
			+ $scope.current + '&dob=' + $scope.dob
			

		}).success(function(data) {
	console.log(data.toArray());
	var aboutData = data.toArray();
	data.each(function(err,doc)
	{
		if(aboutData)
		{
			 var displayData = JSON.stringify(aboutData);
			 name = aboutData.about[0].name;
			 city = aboutData.about[0].city;
			 current = aboutData.about[0].current;
			 dob = aboutData.about[0].dob;
			 
		}
	})
	window.location.assign("/homepage");
}).error(function(error) {
});
};
});