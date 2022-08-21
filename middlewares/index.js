const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi)

const objectIdSchema = Joi.objectId().required();

const validateObjectId = async (req, res, next) => {
  try {
    await objectIdSchema.validateAsync(req.params.id, { abortEarly: false });
  }
  catch (err) {
    return res.status(400).json({ message: err.details.map(({ message }) => message) })
  }

  next();
}

module.exports = { validateObjectId }
