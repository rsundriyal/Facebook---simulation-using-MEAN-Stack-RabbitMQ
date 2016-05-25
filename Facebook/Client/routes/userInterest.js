var mq_client = require('../rpc/client');
exports.userInterestAdd = function(req, res) {
	var interestAdd = req.param("interestAdd");
	console.log("above valid about");
		var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/interest?wsdl";
	  var args = {username: req.param('username'),password: req.param('password')};
	  soap.createClient(url,option, function(err, client) {
	      client.interest(args, function(err, result) {
	    	  if(result.validateReturn === true){
	    		  res.send({statusCode:200});
	    	  }
	    	  else{
	    		  res.send({statusCode:401});
	    	  }
	      });
	  });

};
exports.userInterestRemove = function(req, res) {
	var interest = req.param("interest");
	console.log("above valid about");
	var msg_payload = {
		"interest" : interest,
		};
	console.log("outside valid about");
	mq_client.make_request('userInterestRemove_queue',msg_payload,function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else{
			if(results.code == 200){
				console.log("valid about");
				
				res.send({"interest":"success"});
			}
			else {    
				
				console.log("Invalid signup");
				res.send({"interest":"Fail"});
			}
		}
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