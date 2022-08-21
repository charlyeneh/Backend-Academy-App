const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		enum: ['JSS', 'SSS', 'COMMON'],
		required: true,
	},
});

const subject = mongoose.model('Subject', subjectSchema);

module.exports = subject;
