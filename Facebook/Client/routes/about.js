exports.about = function(req, res){
	console.log("in about page");
	res.render('about', { title: 'edit about' });
};