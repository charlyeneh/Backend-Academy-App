const express = require('express');
const studentsModel = require('../models/students');

//Get student middleware
const getStudent = async (req, res, next) => {
	let student;
	try {
		student = await studentsModel.findById(req.params.id);
		if (student == null) {
			return res.status(404).json({ message: 'Cannot find student' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}

	res.student = student;
	next();
};

module.exports = getStudent;
