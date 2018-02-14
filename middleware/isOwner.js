module.exports = function(req, res, next) {
  // if (req.user.id !== recipe.userId) {
  //   req.flash('error', 'You must be logged in to access that page');
  //   res.redirect('/profile');
  // } else {
  //   next();
  // }
  var db = require('../models');
 	db.recipe.findOne({
		where: {id: req.params.id}
	}).then(function(recipe) {
	  if (req.user.id !== recipe.userId) {
	    req.flash('error', 'You do not have access to that page');
	    res.redirect('/');
	  } else {
	    next();
	  }
	});
};