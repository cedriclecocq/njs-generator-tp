'use strict';
module.exports = class Photo {
	constructor(fichier) {
		this.fichier = fichier;
	}

	toString() {
		return `Photo[fichier: ${this.fichier}]`;
	}
}