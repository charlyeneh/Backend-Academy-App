const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema(
	{
		regNumber: {
			type: String,
			unique: true,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
		},
		lastName: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		sex: {
			type: String,
			required: true,
			enum: ['male', 'female'],
		},
		subjects: [
			{
				type: String,
				required: true,
			},
		],
		class: {
			type: String,
			required: true,
			enum: ['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'],
		},
	},
	{ timestamps: true }
);

const students = mongoose.model('Students', studentsSchema);

module.exports = students;
