const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path')
const cors = require('cors');


const routes = require('./src/routes/routes');
const { fallBack, errorHandler } = require('./src/utils/error-handler.utils');
const { logInfo, logSuccess, logWarning, logError } = require('./src/utils/console.utils');
const { NODE_ENV, PORT, BASE_URL } = require('./src/config');
const { initializeSequelize } = require('./src/config/sequelize.config');


const gracefulShutdownTime = 5000;
let ONLINE = true;

async function main() {


  // create a write stream (in append mode)
  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

  app.use(NODE_ENV === 'prod' ? morgan(`combined`, { stream: accessLogStream }) : morgan('dev'));

  /**
   * SQL Authenticate Database Connection
   */
  await initializeSequelize();



  app.use(cors());
  app.use(express.urlencoded({
    extended: true,
    // limit: '50mb',
    // parameterLimit: 100000,
    // extended: true 
  }));
  app.use(express.json({ limit: '50mb' }));

  /**
   * CHECK APPLICATION ROUTE.
  */
  app.get('/', (req, res) => {
    logSuccess('Dream App Backend is running');
    res.send('Dream App Backend is running');
  });

  app.use('/api', routes);

  /**
   * CHECK APPLICATION SERVER RUNNING ROUTE.
  */
  app.get('/health-check', (req, res) => {
    ONLINE ? res.send('OK') : res.status(503).send('Server shutting down');
  });


  /**If Route Not Exits Then Show Message */
  app.use(fallBack);

  /**
   * For Catching and Handling Default Errors
   */
  app.use(errorHandler);


  const server = app.listen(PORT, () => {

    logSuccess(`Dream App is running at ${BASE_URL}:${PORT} in ${NODE_ENV} mode`);
    logInfo('Press CTRL-C to stop\n');
  });

  const gracefulShutdownHandler = function gracefulShutdownHandler(signal) {
    logError(`⚠️ Caught ${signal}, gracefully shutting down`);
    ONLINE = false;

    setTimeout(() => {
      logError('🤞 Shutting down application');
      // stop the server from accepting new connections
      server.close(function () {
        logError('👋 All requests stopped, shutting down');
        // once the server is not accepting connections, exit
        process.exit();
      });
    }, gracefulShutdownTime);
  };

  // The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
  process.on('SIGINT', gracefulShutdownHandler);

  // The SIGTERM signal is sent to a process to request its termination.
  process.on('SIGTERM', gracefulShutdownHandler);

}

main().catch((error) => {
  logError(`ERROR @ app.js`, error);
  process.exit(1);
})