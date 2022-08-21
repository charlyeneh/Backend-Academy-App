const { ApiError } = require('../utils/error')

const errorMiddleware = (err, req, res, next) => {
  if(err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }

  res.status(500).json({ message: 'Something went wrong!' })
}

module.exports = { errorMiddleware }
