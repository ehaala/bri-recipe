var express = require('express');
var db = require('../models');
var router = express.Router();

var isLoggedIn = require('../middleware/isLoggedIn');
var isOwner = require('../middleware/isOwner');

router.get('/', function(req, res) {
  db.recipe.findAll().then(function(recipes) {
    db.user.findAll().then(function(users) {
      res.render('recipes', {users: users, recipes: recipes})
    })
  })
});

router.get('/:id', isLoggedIn, function(req, res) {
	db.recipe.findOne({
		where: {id: req.params.id},
		include: [db.instruction, db.ingredient, db.image]
	}).then(function(recipe) {
		db.user.findOne({
			where: {id: recipe.userId}
		}).then(function(user) {
			db.favorite.findAll({
				where: {recipeid: recipe.id}
			}).then(function(favorites) {
				res.render('recipe', {recipe: recipe, user: user, favorites: favorites});
			}).catch(function(error) {
	    	res.status(400).render('404');
	  	});
		});
	});
})

router.get('/:id/instructions', isOwner, function(req, res) {
	db.recipe.findOne({
		where: {id: req.params.id},
		include: [db.instruction, db.ingredient, db.image]
	}).then(function(recipe) {
		res.render('editrecipe', {recipe: recipe, user: req.user});
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

router.post('/:id/instructions', isOwner, function(req, res) {
	db.instruction.create({
		instruction: req.body.instruction,
		recipeId: req.params.id
	}).then(function() {
		res.redirect('/recipes/' + req.params.id + '/instructions');
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

router.delete('/:id/instructions/:id', isLoggedIn, function(req, res) {
	db.instruction.destroy({
		where: {
			id: req.params.id,
		}
	}).catch(function(error) {
    	res.status(400).render('404');
  	});
})

router.put('/:id/instructions/:id', function(req, res) {
	db.instruction.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(instruction) {
		instruction.updateAttributes(req.body);
	}).then(function() {
		//
	}).catch(function(error) {
    	res.status(400).render('404');
  	});
})

router.post('/:id/ingredients', isOwner, function(req, res) {
	db.ingredient.create({
		ingredient: req.body.ingredient,
		amount: req.body.amount,
		recipeId: req.params.id
	}).then(function() {
		res.redirect('/recipes/' + req.params.id + '/instructions');
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

router.delete('/:id/ingredients/:id', isLoggedIn, function(req, res) {
	db.ingredient.destroy({
		where: {
			id: req.params.id,
		}
	}).catch(function(error) {
    	res.status(400).render('404');
  	});
})

router.post('/:id/images', isOwner, function(req, res) {
	db.image.create({
		name: req.body.name,
		url: req.body.url,
		recipeId: req.params.id
	}).then(function() {
		res.redirect('/recipes/' + req.params.id + '/instructions');
	}).catch(function(error) {
    res.status(400).render('404');
  });
})

router.delete('/:id/images/:id', isLoggedIn, function(req, res) {
	db.image.destroy({
		where: {
			id: req.params.id,
		}
	}).catch(function(error) {
    	res.status(400).render('404');
  	});
})

module.exports = router;