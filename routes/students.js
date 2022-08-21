const express = require('express');
const router = express.Router();
const studentsModel = require('../models/students');
const getStudent = require('./getStudentMidleware');

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
router.get('/:id', getStudent, (req, res) => {
	res.json(res.student);
});

//Creating student
router.post('/', async (req, res) => {
	const student = new studentsModel({
		regNum: req.body.regNum,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
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
router.patch('/:id', getStudent, async (req, res) => {
	if (req.body.regNum != null) {
		res.student.regNum = req.body.regNum;
	}
	if (req.body.firstName != null) {
		res.student.firstName = req.body.firstName;
	}
	if (req.body.lastName != null) {
		res.student.lastName = req.body.lastName;
	}
	if (req.body.sex != null) {
		res.student.sex = req.body.sex;
	}
	if (req.body.age != null) {
		res.student.age = req.body.age;
	}
	if (req.body.numOfSubjects != null) {
		res.student.numOfSubjects = req.body.numOfSubjects;
	}
	if (req.body.class != null) {
		res.student.class = req.body.class;
	}
	try {
		const updatedStudentRecord = await res.student.save();
		res.json(updatedStudentRecord);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Deleting student
router.delete('/:id', getStudent, async (req, res) => {
	try {
		await res.student.remove();
		res.json({ message: 'Student deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
