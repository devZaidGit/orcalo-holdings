const express = require('express')

const TestRouter = require('./test.routes');

const router = express.Router();


/**
 * Web Routers (route handlers).
 */
router.use('/test', TestRouter);


module.exports = router;