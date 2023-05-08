const { Sequelize } = require('sequelize');
const colors = require('colors/safe');
const { DATABASE,  NODE_ENV} = require('./index');
const { logInfo, logSuccess, logWarning, logError } = require('../utils/console.utils');


const config = {
  host: DATABASE.HOST,
  username: DATABASE.USERNAME,
  password: DATABASE.PASSWORD,
  database: DATABASE.NAME,
  port: DATABASE.PORT,
  dialect: DATABASE.DIALECT,
  benchmark: true,
  logging: NODE_ENV === 'prod' ? false: loggingFunction,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


function loggingFunction(logStr, execTime, options) {

  if (!options) {
    options = execTime;
    execTime = undefined;
  }

  let col = null;
  switch (options.type) {
    case 'SELECT':
      col = colors.blue.bold;
      break;
    case 'UPDATE':
      col = colors.yellow.bold;
      break;
    case 'INSERT':
      col = colors.green.bold;
      break;
    default:
      col = colors.white.bold;
      break;
  }

  if (execTime) {
    if (execTime >= 100) {
      col = colors.red.bold;
      console.log("\n********************START QUERY******************************")
      console.log(colors.magenta.bold(`[${execTime} ms]`), col(logStr));
      console.log("********************END QUERY********************************")


    } else {
      console.log("\n********************START QUERY******************************")
      console.log(colors.magenta.bold(`[${execTime} ms]`), col(logStr));
      console.log("********************END QUERY********************************")
    }
  }
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

async function initializeSequelize() {

  try {
    await sequelize.authenticate();
    logSuccess('SQL Database connected successfully!');
  }
  catch (e) {
    logError('SQL Database authentication error...', e);
    throw new Error(e)
  }

}

module.exports = { sequelize, initializeSequelize: initializeSequelize }

