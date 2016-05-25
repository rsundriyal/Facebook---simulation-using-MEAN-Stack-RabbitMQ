var interest = angular.module('interest', []);
console.log("out of angular about");
interest.controller('interest', function($scope, $http) {
	console.log("in angular about");
	$scope.invalid_interest = true;
	$scope.addInterest = function() {
		console.log("yahi hun");
		$http({
			method : "POST",
			url : '/userInterestAdd?interestAdd=' + $scope.interestAdd

		}).success(function(data) {
	console.log("qwerty angular about");
	window.location.assign("/homepage");
}).error(function(error) {
});
};
 
$scope.removeInterest = function() {
	console.log("yahi hun");
	$http({
		method : "POST",
		url : '/userInterestRemove?interest=' + $scope.interestRemove
		
	}).success(function(data) {
console.log("qwerty angular about");
window.location.assign("/homepage");
}).error(function(error) {
});
};

});