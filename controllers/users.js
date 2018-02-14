var express = require('express');
var db = require('../models');
var router = express.Router();

var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
	db.user.findAll().then(function(users) {
		res.render('users', {users: users});
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

router.get('/:id', isLoggedIn, function(req, res) {
	db.user.findOne({
		where: {id: req.params.id},
		include: [db.recipe]
	}).then(function(user) {
			res.render('userinfo', {user: user});
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

router.post('/:id/recipe', isLoggedIn, function(req, res) {
	db.recipe.create({
		name: req.body.name,
		userId: req.user.id
	}).then(function() {
		res.redirect('/profile');
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

module.exports = router;