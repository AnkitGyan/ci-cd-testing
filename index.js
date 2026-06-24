require('dotenv').config();
const logger = require('./src/utils/logger');

const app = require('./src/server');

logger.info('Backend server has started');
