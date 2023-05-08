'use strict'

const { createRecordService, getRecordService } = require('../services/test.service');

const createRecord = async (req, res, next) => {

  try {

    const { body } = req

    const result = await createRecordService(body);

    res.status(200).json({
      status: 200,
      message: "Create Record Successfully",
      result: {
        data: result
      }
    });

  } catch (e) {
    next(e)
  }
}

const getRecord = async (req, res, next) => {

  try {

    const { query } = req

    const result = await getRecordService(query);

    res.status(200).json({
      status: 200,
      message: "Get Record Successfully",
      result: {
        data: result
      }
    });

  } catch (e) {
    next(e)
  }
}

module.exports = {
  createRecord,
  getRecord
}
