var mq_client = require('../rpc/client');
exports.userSignup = function(req, res) {
	var username = req.param("username");
	var password = req.param("password");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var email = req.param("email");
	var msg_payload = {
		"username" : username,
		"password" : password,
		"firstname" : firstname,
		"lastname" : lastname,
		"email" : email
	};
	mq_client.make_request('signup_queue',msg_payload,function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else{
			if(results.code == 200){
				console.log("valid signup");
				
				res.send({"signup":"Success"});
			}
			else {    
				
				console.log("Invalid signup");
				res.send({"signup":"Fail"});
			}
		}
	});
};