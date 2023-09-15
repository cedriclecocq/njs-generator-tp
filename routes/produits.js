const express = require('express');

const Produit = require("./../entity/produit");

const router = express.Router();

/* GET produits listing. */
router.get('/lister', async (req, res, next) => {
	try {
		const docs = await Produit.find().exec();
		res.render('liste-produits', {produits: docs});
	}
	catch (error) {
		return next(error);
	}
});

router.get('/creer', (req, res) => {
	res.render('creer-produit');
});

router.post('/do-creer', async (req, res, next) => {
	try {
		const newProduit = new Produit(req.body);
		await newProduit.save();
		res.redirect('lister');
	}
	catch (error) {
		return next(error);
	}
});

router.get('/modifier', async (req, res, next) => {
	try {

		const doc = await Produit.findOne({_id: req.query.id}).exec();
		res.render('modifier-produit', {produit: doc});
	}
	catch (error) {
		return next(error);
	}
});

router.post('/do-modifier', async (req, res, next) => {
	try {
		const result = await Produit.replaceOne({_id: req.body.id}, req.body).exec();
		res.redirect('lister');
	}
	catch (error) {
		return next(error);
	}
});

router.get('/supprimer', async (req, res, next) => {
	try {
		const deleteResult = await Produit.deleteOne({_id: req.query.id}).exec();
		res.redirect('lister');
	}
	catch (error) {
		return next(error);
	}
})

module.exports = router;
