let envAppConfig = {};

// get app config override from env variable

let appConfig = Object.assign({
  greeting: 'Hello',
  logger: {
    console: {
      level: 'debug'
    },
    file: {
      filename: 'application.log',
      level: 'debug'
    }
  }
}, envAppConfig);

module.exports = appConfig;
