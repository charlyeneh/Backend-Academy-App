const Joi = require('joi');
const { getSubjectsByClass } = require('../services/subjects');

const createStudentSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  middleName: Joi.string().min(2).max(30),
  lastName: Joi.string().min(2).max(30).required(),
  dob: Joi.date().required(),
  sex: Joi.string().valid('male', 'female').required(),
  class: Joi.string().valid('JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3').required(),
  subjects: Joi.array().items(Joi.string()).min(5).max(9),
}).required();

const validateCreateStudent = async (req, res, next) => {
  try {
    await createStudentSchema.validateAsync(req.body, { abortEarly: false });

    const { class: className, subjects } = req.body;
    const classSubjects = (await getSubjectsByClass(className)).map(({ name }) => name);

    if(!subjects.every(subject => classSubjects.includes(subject))) {
      return res.status(400).json({ message: `Invalid subject detected! Allowed subjects for ${className} are: [${classSubjects}]` })
    }
  }
  catch (err) {
    return res.status(400).json({ message: err.details.map(({ message }) => message) })
  }

  next();
}

const fetchStudentParameters = Joi.object({
  firstName: Joi.string().min(2).max(30),
  middleName: Joi.string().min(2).max(30),
  lastName: Joi.string().min(2).max(30),
  sex: Joi.string().valid('male', 'female'),
  class: Joi.string().valid('JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'),
  subjects: Joi.array().items(Joi.string()).min(1).max(12),
  page: Joi.number().integer().min(1).default(1),
  size: Joi.number().integer().min(1).max(50).default(20),
});

const validateFetchStudentParameters = async (req, res, next) => {
  try {
    const result = await fetchStudentParameters.validateAsync(req.query, { abortEarly: false });
    req.query = result;
  }
  catch (err) {
    return res.status(400).json({ message: err.details.map(({ message }) => message) })
  }

  next();
}

module.exports = { validateCreateStudent , validateFetchStudentParameters}
