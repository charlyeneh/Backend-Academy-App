const mongoose = require('mongoose');

const subjectsSchema = new mongoose.Schema({
	regNum: {
		type: String,
		required: true,
	},
});
