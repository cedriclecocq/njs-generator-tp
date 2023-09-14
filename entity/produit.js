'use strict';
const mongoose = require("mongoose");

const produitShema = new mongoose.Schema({
	marque: {type: String, required: true},
	nom: {type: String, required: true},
	prix: {type: Number, required: true, min: 0}
});

const Produit = mongoose.model('produit', produitShema);

module.exports = Produit;