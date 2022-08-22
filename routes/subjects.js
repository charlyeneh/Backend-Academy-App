const express = require('express');
const app = express();
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
 * /api/v1/subjects:
 *  get:
 *    summary: This api is used to get all the 12 subjects from mongoDB database.
 *    description: Get all subjects
 *    responses:
 *      200:
 *        description: Success
 */

router.get('/', async (req, res, next) => {
	try {
		const subjects = await getAllSubjects();
		res.json(subjects);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/v1/subjects/:id:
 *  get:
 *    summary: This api is used to get a single subject from mongoDB database.
 *    description: Get one subject
 *    responses:
 *      200:
 *        description: Success
 */
router.get('/:id', validateObjectId, async (req, res, next) => {
	try {
		const subject = await getSubjectById(req.params.id);
		res.json(subject);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/v1/subjects:
 *  post:
 *    summary: This api is used to create a new subject.
 *    description: Create a new subject
 *    responses:
 *      201:
 *        description: Subject successfully created
 */
router.post('/', async (req, res, next) => {
	const { name, type } = req.body;

	try {
		subject = await createSubject({ name, type });
		res.json(subject);
	} catch (error) {
		next(error);
	}
});

/**
 * @swagger
 * /api/v1/subjects/:id:
 *  patch:
 *    summary: This api is used to update a subject from mongoDB database.
 *    description: Update a subject record.
 *    responses:
 *      200:
 *        description: Subject successfully updated
 */
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

/**
 * @swagger
 * /api/v1/subjects/id:
 *  delete:
 *    summary: This api is used to delete a subject from mongoDB database.
 *    description: This api is used to fetch a single subject data and delete it.
 *    responses:
 *      200:
 *        description: Subject successfully deleted
 */
router.delete('/:id', validateObjectId, async (req, res, next) => {
	try {
		await deleteSubject(req.params.id);

		res.status(202).json({ message: 'Deleted!' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
