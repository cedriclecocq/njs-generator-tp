const express = require('express');
const {InsertOneResult, ObjectId} = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

const Produit = require("./../entity/produit");

const url = "mongodb://127.0.0.1";
const dbName = "cedric";
const colName = "produits";

const router = express.Router();

/* GET produits listing. */
router.get('/lister', async (req, res, next) => {
	let client;
	try {
		client = await MongoClient.connect(url);
		let result = [];

		const db = client.db(dbName);
		const collection = db.collection(colName);

		const cursor = collection.find();

		for await (const doc of cursor) {
			result.push(doc);
		}

		/*while ( await cursor.hasNext() ) {
			result.push(await cursor.next());
		}*/

		// result = await cursor.toArray();

		res.render('liste-produits', {produits: result});
	}
	catch (error) {
		return next(error);
	}
	finally {
		await client.close();
	}
});

router.get('/creer', (req, res) => {
	res.render('creer-produit');
});

router.post('/do-creer', async (req, res, next) => {
	let client;
	try {
		client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection(colName);

		let insertOneResult = await collection.insertOne(new Produit(
			req.body.marque,
			req.body.nom,
			req.body.prix,
			[]
		));
		res.redirect('lister');
	}
	catch (error) {
		return next(error);
	}
	finally {
		await client.close();
	}
});

router.get('/modifier', async (req, res, next) => {
	let client;
	try {
		client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection(colName);

		const doc = await collection.findOne({_id: new ObjectId(req.query.id)});
		res.render('modifier-produit', {produit: doc});
	}
	catch (error) {
		return next(error);
	}
	finally {
		await client.close();
	}
});

router.post('/do-modifier', async (req, res, next) => {
	let client;
	try {
		client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection(colName);

		const result = await collection.replaceOne({_id: new ObjectId(req.body.id)},
			{marque: req.body.marque, nom: req.body.nom, prix: req.body.prix});
		res.redirect('lister');
	}
	catch (error) {
		return next(error);
	}
	finally {
		await client.close();
	}
});

router.get('/supprimer', async (req, res, next) => {
	let client;
	try {
		client = await MongoClient.connect(url);
		const db = client.db(dbName);
		const collection = db.collection(colName);

		const deleteResult = await collection.deleteOne({_id: new ObjectId(req.query.id)});

		res.redirect('lister');
	}
	catch (error) {
		return next(error);
	}
	finally {
		await client.close();
	}
})

module.exports = router;
