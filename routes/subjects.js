const express = require('express');
const router = express.Router();
const students = require('../models/subjects');

//Getting all
router.get('/', (req, res) => {
	res.send('Hello world');
});

//Getting one
router.get('/:id', (req, res) => {});

//Creating one
router.post('/', (req, res) => {});

//Updating one
router.patch('/:id', (req, res) => {});

//Deleting one
router.delete('/:id', (req, res) => {});

module.exports = router;
