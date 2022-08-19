require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connection to the database is successful'));

//db connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(port, () => {
	console.log(`App is listening on port ${port}!`);
});
