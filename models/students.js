const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
	regNum: {
		type: String,
		required: true,
	},
	sex: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	numOfSubjects: {
		type: Number,
		required: true,
	},
	class: {
		type: String,
		required: true,
	},
});

const students = mongoose.model('Students', studentsSchema);

module.exports = students;
