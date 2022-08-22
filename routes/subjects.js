const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const {
	getAllSubjects,
	getSubjectById,
	createSubject,
	updateSubject,
	deleteSubject,
} = require('../services/subjects');
const { ApiError } = require('../utils/error');
const { validateObjectId } = require('../middlewares');

const router = express.Router();

//Getting all
router.get('/', async (req, res, next) => {
	try {
		const subjects = await getAllSubjects();
		res.json(subjects);
	} catch (error) {
		next(error);
	}
});

//Getting one
router.get('/:id', validateObjectId, async (req, res, next) => {
	try {
		const subject = await getSubjectById(req.params.id);
		res.json(subject);
	} catch (error) {
		next(error);
	}
});

//Creating subject
router.post('/', async (req, res, next) => {
	const { name, type } = req.body;

	try {
		subject = await createSubject({ name, type });
		res.json(subject);
	} catch (error) {
		next(error);
	}
});

//Updating subject
router.patch('/:id', validateObjectId, async (req, res, next) => {
	const { id } = req.params;
	const { name, type } = req.body;

	try {
		await updateSubject(id, { name, type });
		res.status(202).json({ message: 'Updated!' });
	} catch (error) {
		next(error);
	}
});

//Deleting subject
router.delete('/:id', validateObjectId, async (req, res, next) => {
	try {
		await deleteSubject(req.params.id);

		res.status(202).json({ message: 'Deleted!' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
