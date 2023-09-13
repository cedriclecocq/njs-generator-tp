'use strict';
module.exports = class Produit {
	constructor(marque, nom, prix, photos) {
		this.marque = marque;
		this.nom = nom;
		this.prix = prix;
		this.photos = photos;
	}

	toString() {
		return `Produit[marque: ${this.marque}, nom: ${this.nom}, prix: ${this.prix}, photos: ${this.photos}]`;
	}
}