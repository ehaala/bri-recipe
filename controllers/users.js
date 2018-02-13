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

module.exports = router;