var signup = angular.module('signup', []);
signup.controller('signup', function($scope, $http) {
	$scope.signup = function() {
		$http(
				{
					method : "GET",
					url : '/userSignup?username=' + $scope.username
							+ '&password=' + $scope.password + '&firstname='
							+ $scope.firstname + '&lastname=' + $scope.lastname
							+ '&email=' + $scope.email
					
				}).success(function(data) {
					window.location.assign("/login");
		}).error(function(error) {
		});
	};
});