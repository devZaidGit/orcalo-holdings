const express = require('express');

const TestRouter = express.Router();

/**
 * Auth controllers (route handlers).
 */
const {createRecord, getRecord  } = require('../controllers/test.controller');


// ********************************
TestRouter.post('/create',(...args) => createRecord(...args));
TestRouter.get('/get', (...args) => getRecord(...args));


module.exports = TestRouter;