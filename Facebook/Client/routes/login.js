/**
 * New node file
 */
var mq_client = require('../rpc/client');
var firstname, lastname, email, username;
exports.login = function(req, res) {
	console.log('5555');
	res.render('login', {
		title : "Login Page"
	});
};

exports.checkLogin = function(req, res) {
	// These two variables come from the form on
	// the views/login.hbs page
	username = req.param("username");
	var password = req.param("password");
	var msg_payload = { "username": username, "password": password };
	console.log("In POST Request = UserName:" + username + " " + password);
	mq_client.make_request('login_queue', msg_payload, function(err, results) {

		console.log(results);
		if (err) {
			throw err;
		} else {
			if (results.code == 200) {
				console.log("valid Login");
				
				firstname = results.info.firstname;
				lastname = results.info.lastname;
				email = results.info.email;
				console.log(username+" "+firstname+" "+lastname+" "+email);
				res.send({
					"login" : "Success"
				});
			} else {

				console.log("Invalid Login");
				res.send({
					"login" : "Fail"
				});
			}
		}
	});
};

// Redirects to the homepage
exports.redirectToHomepage = function(req, res) {
	// Checks before redirecting whether the session is valid
	
		// Set these headers to notify the browser not to maintain any cache for
		// the page being loaded
		res
				.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage", {
			username : username,
			firstname : firstname,
			lastname : lastname,
			email : email
		});
	
};

// Logout the user - invalidate the session
exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};
