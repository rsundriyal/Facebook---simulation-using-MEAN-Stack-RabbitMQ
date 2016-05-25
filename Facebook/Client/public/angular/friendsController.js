var friends = angular.module('friends', []);

friends.controller('friends', function($scope, $http) {
	
	$scope.invalid_friends = true;
	$scope.friendsRequest = function() {
		console.log("yahi hun");
		$http({
			method : "POST",
			url : '/friendRequest?name=' + $scope.name
			+ '&email=' + $scope.email 
			

		}).success(function(data) {
			var userList = [];
			for(var i=0; i<data.length();i++)
			{
				userList.push(data[i].from_user);
				userList.push(data[i].to_user);
				var friendList = userList.getFriend();
				name = data[i].name;
				name = data[i].email;
			}
			
			
	window.location.assign("/homepage");
}).error(function(error) {
});
};

$scope.acceptFriends = function() {
	console.log("yahi hun");
	$http({
		method : "GET",
		url : '/acceptRequest?name=' + $scope.name
		+ '&email=' + $scope.email 
		

	}).success(function(data) {
console.log("qwerty angular about");
window.location.assign("/homepage");
}).error(function(error) {
});
};
});