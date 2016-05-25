exports.about = function(req, res){
	console.log("in friends page");
	res.render('friends', { title: 'send friendRequest' });
};