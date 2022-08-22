require('dotenv').config();

const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();
const mongoose = require('mongoose');
const { errorMiddleware } = require('./middlewares/errors');
const studentsRouter = require('./routes/students');

const subjectsRouter = require('./routes/subjects');

const port = process.env.PORT || 5000;

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connection to the database is successful'));

//Swagger documentation
const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'School Management API(Backend Academy)',
			version: '1.0.0',
		},
	},
	apis: ['routes/students.js'],
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

//db connection
mongoose.connect(
	process.env.DATABASE_URL || 'mongodb://localhost:27017/charly',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.use(express.json());

//The API routes
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/subjects', subjectsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
	console.log(`App is listening on port ${port}!`);
});
