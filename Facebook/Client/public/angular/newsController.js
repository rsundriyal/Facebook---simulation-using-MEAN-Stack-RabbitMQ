var news = angular.module('news', []);
console.log("out of angular about");
news.controller('news', function($scope, $http) {
	console.log("in angular about");
	$scope.invalid_news = true;
	$scope.news = function() {
		console.log("yahi hun");
		$http({
			method : "GET",
			url : '/news?newsFeed=' + $scope.newsFeed
			
		}).success(function(data) {
			var newsList = [];
			for(var i=0; i<data.length();i++)
			{
				newsList[i] = data[i].newsFeed;
			}
			
	window.location.assign("/homepage");
}).error(function(error) {
});
};
});