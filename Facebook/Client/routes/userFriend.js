var soap = require('soap');
var baseURL = "http://localhost:8080/FacebookServer/services";
exports.sendFriendRequest = function(req, res) {
	var name = req.param("email");
	
		var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/friends?wsdl";
	  var args = {username: req.param('username'),password: req.param('password')};
	  soap.createClient(url,option, function(err, client) {
	      client.friends(args, function(err, result) {
	    	  if(result.validateReturn === true){
	    		  res.send({statusCode:200});
	    	  }
	    	  else{
	    		  res.send({statusCode:401});
	    	  }
	      });
	  });

};

//Redirects to the homepage
exports.redirectToHomepage = function(req, res) {
	// Checks before redirecting whether the session is valid
	
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		res
				.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage");
	
};