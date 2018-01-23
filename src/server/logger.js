/* eslint-disable no-console */
const winston = require('winston');

const log = (local, logger, err) => {
  if (process.env.LOGGING_ENABLED) {
    if (process.env.NODE_ENV === ('dev')) {
      return local(err);
    }
    return logger(err);
  }
  return null;
};

class Logger {
  error(err) {
    log(console.error, winston.error, err);
  }
  warn(err) {
    log(console.warn, winston.warn, err);
  }
  info(err) {
    log(console.info, winston.info, err);
  }
  verbose(err) {
    log(console.info, winston.verbose, err);
  }
  debug(err) {
    log(console.debug, winston.debug, err);
  }
}

module.exports = Logger;
