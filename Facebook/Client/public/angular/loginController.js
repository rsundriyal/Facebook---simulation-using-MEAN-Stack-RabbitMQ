//loading the 'login' angularJS module
var login = angular.module('login', []);
// defining the login controller
login.controller('login', function($scope, $http) {
	// Initializing the 'invalid_login' and 'unexpected_error'
	// to be hidden in the UI by setting them true,
	// Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.login = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username,
				"password" : $scope.password
			}
		}).success(function(data) {
			// checking the response data for statusCode
			if (data.login == "Success") {
				window.location.assign("/homepage");
			} else {

				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
		}).error(function(error) {
		});
	};
});
