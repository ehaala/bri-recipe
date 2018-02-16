var express = require('express');
var db = require('../models');
var router = express.Router();

var isLoggedIn = require('../middleware/isLoggedIn');
var isOwner = require('../middleware/isOwner');

router.get('/', isLoggedIn, function(req, res) {
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.favorite]
	}).then(function(user) {
		res.render('myrecipes', {user: user});
	}).catch(function(error) {
    	res.status(400).render('404');
  });
})

router.post('/', isLoggedIn, function(req, res) {
	db.user.find({
		where: {id: req.user.id}
	}).then(function(user) {
		db.favorite.findOrCreate({
			where: {
				name: req.body.name,
				recipeid: req.body.recipeid,
				userId: req.user.id
			}
		}).spread(function(favorite, created) {
			user.addFavorite(favorite).then(function(favorite) {
				res.redirect('/myrecipes');
			})
		})
	}).catch(function(error) {
    	res.status(400).render('404');
  	});
})

router.delete('/:id', isLoggedIn, function(req, res) {
	db.favorite.destroy({
		where: {
			id: req.params.id,
		}
	}).catch(function(error) {
    	res.status(400).render('404');
  	});
})

module.exports = router;