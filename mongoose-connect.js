const mongoose = require("mongoose");
const url = "mongodb+srv://njs:njs@njs.mw74jdt.mongodb.net/cedric";

mongoose.connect(url);
mongoose.connection.on('connected', () => console.log('Mongoose connection opened'));
mongoose.connection.on('error', err => console.error(err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));
mongoose.connection.on('reconnected', () => console.log('Mongoose reconnected'));
process.on('SIGINT', () => {
	mongoose.connection.close()
		.then(() => {
			console.log('Mongoose closed by app termination');
			process.exit(0);
		});
})