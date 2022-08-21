require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { errorMiddleware } = require('./middlewares/errors');
const studentsRouter = require('./routes/students');

const classesRouter = require('./routes/subjects');

const port = process.env.PORT || 5001;

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connection to the database is successful'));

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
app.use('/api/v1/subjects', classesRouter);

app.use(errorMiddleware);

app.listen(port, () => {
	console.log(`App is listening on port ${port}!`);
});
