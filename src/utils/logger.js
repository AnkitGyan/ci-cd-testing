const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '../../logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const levels = {
  error: 'ERROR',
  warn: 'WARN',
  info: 'INFO',
  debug: 'DEBUG'
};

const formatLog = (level, message, data = '') => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${level}: ${message} ${data ? JSON.stringify(data) : ''}`.trim();
};

const writeLog = (message) => {
  try {
    fs.appendFileSync(LOG_FILE, message + '\n');
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};

const logger = {
  error: (message, error) => {
    const logMessage = formatLog(levels.error, message, error);
    console.error(logMessage);
    writeLog(logMessage);
  },
  
  warn: (message, data) => {
    const logMessage = formatLog(levels.warn, message, data);
    console.warn(logMessage);
    writeLog(logMessage);
  },
  
  info: (message, data) => {
    const logMessage = formatLog(levels.info, message, data);
    console.log(logMessage);
    writeLog(logMessage);
  },
  
  debug: (message, data) => {
    if (process.env.DEBUG === 'true') {
      const logMessage = formatLog(levels.debug, message, data);
      console.debug(logMessage);
      writeLog(logMessage);
    }
  }
};

module.exports = logger;
