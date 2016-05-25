var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , signup = require('./routes/signup')
  , login = require('./routes/login')
  , path = require('path')
  , about = require('./routes/aboutScreen')
  , userAbout = require('./routes/about')
  , userInterest = require('./routes/userInterest')
  ,interest = require('./routes/interest')
  ,friend = require('./routes/friendsScreen')
  ,groups = require('./routes/groups')
  ,news = require('./routes/news');

var app = express();

// all environments
app.set('port', process.env.PORT || 4444);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/homepage',login.redirectToHomepage);
app.get('/homepage',userAbout.redirectToHomepage);
app.get('/login',login.login);
app.post('/checklogin', login.checkLogin);
app.post('/logout', login.logout);
app.get('/userSignup',signup.userSignup);
app.post('/about', about.about);
app.post('/aboutScreen' , userAbout.userAbout)
app.post('/interestedit', interest.interest);
app.post('/userInterestAdd', userInterest.userInterestAdd);
app.post('/userInterestRemove', userInterest.userInterestRemove);
app.get('/sendFriendRequest', friend.sendFriendRequest);
app.post('/acceptFriendRequest', friend.acceptFriendRequest);
app.get('/getnewsFeed', news.getnewsFeed);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});