const express = require('express');
const router = express.Router();
const studentsModel = require('../models/students');

//Getting all students
router.get('/', async (req, res) => {
	try {
		const students = await studentsModel.find({});
		res.json(students);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Getting one student
router.get('/:id', (req, res) => {
	res.send(req.params.id);
});

//Creating student
router.post('/', async (req, res) => {
	const student = new studentsModel({
		regNum: req.body.regNum,
		sex: req.body.sex,
		age: req.body.age,
		numOfSubjects: req.body.numOfSubjects,
		class: req.body.class,
	});
	try {
		const newStudent = await student.save();
		res.status(201).json(newStudent);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Updating student
router.patch('/:id', (req, res) => {});

//Deleting student
router.delete('/:id', (req, res) => {});

module.exports = router;
