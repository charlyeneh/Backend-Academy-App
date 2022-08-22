const subjectModel = require('../models/subjects');
const { ApiError } = require('../utils/error');

const getAllSubjects = async () => {
	const query = {};
	const project = {
		_id: 0,
		subjectId: "$_id",
		name: 1,
		type: 1,
	};

	return await subjectModel.find(query, project).lean()
};

const getSubjectById = async (id) => {
  const project = {
		_id: 0,
		subjectId: "$_id",
		name: 1,
		type: 1,
  };
  
	const subject = await subjectModel.findOne({ _id: id }, project).lean();

	if(!subject) {
		throw new ApiError(404, `Subject with id: ${id} not found`);
	}

	return subject;
};

const getSubjectByName = async (name) => {
  return await subjectModel.findOne({ name }).lean();
};

const createSubject = async ({ name, type }) => {
	let subject = await getSubjectByName(name);
	
	if(subject) {
		throw new ApiError(409, `${name} already exist!`);
	}

  return await subjectModel.create({ name, type });
};

const updateSubject = async (id, { name, type }) => {
	const filter = { _id: id };
	const update = {
		$set: {
			name,
			type,
		}
	}

	let subject = await getSubjectById(id);

	if(!subject) {
		throw new ApiError(409, `Subject with id: ${id} does not exist!`);
	}

	await subjectModel.updateOne(filter, update);
};

const getSubjectsByClass = async (grade) => {
	const filter = {
		type: {
			$in: [grade, 'common']
		}
	};
	const project = { name: 1, _id: 0 };

	return await subjectModel.find(filter, project).lean();
};

const deleteSubject = async (id) => {
	const filter = { _id: id };

	return await subjectModel.deleteOne(filter);
};

const deleteAllSubjects = async () => {
	return await subjectModel.deleteMany({});
};

module.exports = {
	getAllSubjects,
	getSubjectById,
	getSubjectByName,
	createSubject,
	updateSubject,
	getSubjectsByClass,
	deleteSubject,
	deleteAllSubjects,
}
