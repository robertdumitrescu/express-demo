const winston = require('winston');

module.exports = create;

function create({appConfig}) {
  return new winston.Logger({
    transports: [
      new winston.transports.Console(appConfig.logger.console),
      new winston.transports.File(appConfig.logger.file)
    ]
  })
}