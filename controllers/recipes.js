var express = require('express');
var db = require('../models');
var router = express.Router();

var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/:id', isLoggedIn, function(req, res) {
	db.recipe.findOne({
		where: {id: req.params.id},
		include: [db.instruction]
	}).then(function(recipe) {
		res.render('recipe', {recipe: recipe});
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

router.get('/:id/instructions', isLoggedIn, function(req, res) {
	db.recipe.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(recipe) {
		res.render('editrecipe', {recipe: recipe, user: req.user});
	}).catch(function(error) {
    	res.status(400).render('404');
  });
})

router.post('/:id/instructions', isLoggedIn, function(req, res) {
	db.instruction.create({
		instruction: req.body.instruction,
		recipeId: req.params.id
	}).then(function() {
		res.redirect('/profile');
	}).catch(function(error) {
    	res.status(400).render('404');
  });
})

module.exports = router;