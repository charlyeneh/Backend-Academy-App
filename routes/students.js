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
 * /api/v1/students:
 *  get:
 *    summary: This api is used to get all student's data from the mongoDB database
 *    description: Get all students
 *    responses:
 *      200:
 *        description: Success
 */

router.get('/', validateFetchStudentParameters, async (req, res, next) => {
	try {
		const students = await getAllStudents(req.query);
		res.json(students);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/v1/students/:id:
 *  get:
 *    summary: This api is used to get a single student's data from the mongoDB database
 *    description: Get one students
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/:id', validateObjectId, async (req, res, next) => {
	try {
		const student = await getStudentById();
		res.json(student);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/v1/students:
 *  post:
 *    summary: This api is used to creat a student's record and stores it in the mongoDB database
 *    description: Create a new student
 *    responses:
 *      201:
 *        description: Student successfully created
 */
router.post('/', validateCreateStudent, async (req, res, next) => {
	try {
		const student = await createStudent(req.body);
		res.status(201).json(student);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/v1/students/:id:
 *  patch:
 *    summary: This api is used to edit/update a student's data in the mongoDB database
 *    description: Update a student's record
 *    responses:
 *      200:
 *        description: Student's document successfully updated
 */
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

/**
 * @swagger
 * /api/v1/students/:id:
 *  delete:
 *    summary: This api is used to delete student's record from mongoDB database.
 *    description: This api is used to fetch a single student data and delete it.
 *    responses:
 *      200:
 *        description: Student successfully deleted
 */
router.delete('/:id', validateObjectId, async (req, res, next) => {
	try {
		await deleteStudent(req.params.id);
		res.json({ message: 'Student deleted successfully' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
