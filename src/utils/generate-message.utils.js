const { NODE_ENV, ENV_LANG } = require('../config');

const responses = require('../config/codes.json');

const generateMessages = (code, validator) => {

    if (validator) {
        return responses[`${NODE_ENV}`][`${ENV_LANG}`]['validator'][`${code}`];
    }

    return responses[`${NODE_ENV}`][`${ENV_LANG}`][`${code}`];

};

module.exports = generateMessages;
