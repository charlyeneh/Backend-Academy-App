const express = require('express');
const app = express();
const router = express.Router();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const {
	validateCreateStudent,
	validateFetchStudentParameters,
} = require('../middlewares/students');

const {
	createStudent,
	getAllStudents,
	getStudentById,
} = require('../services/students');
const { validateObjectId } = require('../middlewares');

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'School Management API(Backend Academy)',
			version: '1.0.0',
		},
	},
	apis: ['students.js', 'subjects.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /students:
 * 		get:
 * 			description: Get all students
 * 			responses:
 * 				200:
 * 					description: Success
 *
 */

//Getting all students
router.get('/', validateFetchStudentParameters, async (req, res, next) => {
	try {
		const students = await getAllStudents(req.query);
		res.json(students);
	} catch (error) {
		next(error);
	}
});

//Getting one student
router.get('/:id', validateObjectId, async (req, res, next) => {
	try {
		const student = await getStudentById();
		res.json(student);
	} catch (error) {
		next(error);
	}
});

//Creating student
router.post('/', validateCreateStudent, async (req, res, next) => {
	try {
		const student = await createStudent(req.body);
		res.status(201).json(student);
	} catch (error) {
		next(error);
	}
});

//Updating student
router.patch(
	'/:id',
	validateObjectId,
	validateCreateStudent,
	async (req, res, next) => {
		try {
			await updateStudent(req.params.id, req.body);
			res.json({ message: 'Updated!' });
		} catch (error) {
			next(error);
		}
	}
);

//Deleting student
router.delete('/:id', validateObjectId, async (req, res, next) => {
	try {
		await deleteStudent(req.params.id);
		res.json({ message: 'Student deleted successfully' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
