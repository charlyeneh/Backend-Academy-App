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
const version1 = '/api/v1';

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connection to the database is successful'));

//db connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//Swagger documentation
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'School Management API(Backend Academy) - Assurdly Assessment',
			version: '1.0.0',
		},
	},
	apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(`${version1}/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());

//The API routes
app.use(`${version1}/students`, studentsRouter);
app.use(`${version1}/subjects`, subjectsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
	console.log(`App is listening on port ${port}!`);
});
