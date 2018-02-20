var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var db = require('./models');

var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var isOwner = require('./middleware/isOwner');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

//these lines MUST occur after the session is configured
var passport = require('./config/ppConfig');
// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  db.recipe.findAll().then(function(recipes) {
    res.render('index', {recipes: recipes});
  })
});

app.get('/profile', isLoggedIn, function(req, res) {
	db.user.findOne({
		where: {id: req.user.id},
    include: [db.recipe]
	}).then(function(user) {
    user.getRecipes().then(function(recipe) {
      res.render('profile', {recipe: recipe, user: user});
    })
	})
});

app.use('/favorites', require('./controllers/favorites'));
app.use('/recipes', require('./controllers/recipes'));
app.use('/users', require('./controllers/users'));
app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;