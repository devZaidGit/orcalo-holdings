const dotenv = require('dotenv');
const { logInfo, logSuccess, logWarning, logError } = require('./console.utils');

dotenv.config({ path: '../.env' });

const fallBack = (req, res, next) => {
    const error = new Error()
    error.message = `Invalid route - ${req.originalUrl}`
    error.status = 404;
    res.status(404);
    next(error);
};


const errorHandler = (error, req, res, next) => {

    const { body, query, headers, method, originalUrl } = req;

    if (error.stack && process.env.NODE_ENV === 'development') {

        console.log(error);

        console.error({
            message: error.message || error.name
        });
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(error);
    }

    if (error.code === 11000) {
        return res.status(400).json(error);
    }

    if (error.stack && process.env.NODE_ENV === 'development') {
        console.error(error, error.stack);
    }

    if (error.errors) {
        return res.status(403).json({
            status: 403,
            message: 'Invalid request',
            errors: error.errors.map((err) => err.message)
        });
    }


    return res.status(error.status || 500).json({
        status: error.status,
        message: error.message || error.name || error
    });
};

module.exports = {errorHandler, fallBack}
