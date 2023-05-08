const { validationResult } = require("express-validator");
const generateMessages = require('../utils/generate-message.utils');

module.exports = {
  validate : (validations) => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      
      var errorArray = new Array();
      errors.array().forEach((element) => {
        errorArray.unshift(element.msg);
      });

      return res.status(403).json({...generateMessages('VALIDATION_ERROR'), "error": errorArray});
    };
  }
};
