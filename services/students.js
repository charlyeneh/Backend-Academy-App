const studentModel = require('../models/students');
const { ApiError } = require('../utils/error');

const generateRegNumber = async () => {
	const lastStudent = await studentModel
		.findOne({})
		.sort({ createdAt: 'desc' })
		.limit(1);

	if (!lastStudent) {
		return '0001';
	}

	const { regNumber } = lastStudent;

	return `000${+regNumber + 1}`.slice(-4);
};

const createStudent = async (data) => {
	const regNumber = await generateRegNumber();

	return await studentModel.create({ ...data, regNumber });
};

const getAllStudents = async (params) => {
	const { page, size, ...rest } = params;
	const query = { ...rest };
	const project = {
		_id: 0,
	};

	return await studentModel
		.find(query, project)
		.skip((page - 1) * size)
		.limit(size)
		.lean();
};

const getStudentById = async (id) => {
	const project = {
		_id: 0,
	};

	const student = await studentModel.findOne({ _id: id }, project).lean();

	if (!student) {
		throw new ApiError(404, `Student with id: ${id} not found`);
	}

	return student;
};

const updateStudent = async (id, data) => {
	const filter = { _id: id };
	const update = {
		$set: { ...data },
	};

	let student = await getStudentById(id);

	if (!student) {
		throw new ApiError(409, `Student with id: ${id} does not exist!`);
	}

	await studentModel.updateOne(filter, update);
};

const getStudentsByClass = async (grade, level) => {
	const filter = {
		grade,
		level,
	};
	const project = { _id: 0 };

	return await studentModel.find(filter, project).lean();
};

const deleteStudent = async (id) => {
	const filter = { _id: id };

	return await studentModel.deleteOne(filter);
};

const deleteAllStudents = async () => {
	return await studentModel.deleteMany({});
};

module.exports = {
	getAllStudents,
	createStudent,
	getStudentById,
	updateStudent,
	getStudentsByClass,
	deleteStudent,
	deleteAllStudents,
};
