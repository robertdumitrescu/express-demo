const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = getConfig;

function getConfig(envFilename) {
  let appConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
  let envAppConfig = {};
  try {
    envAppConfig = JSON.parse(fs.readFileSync(envFilename, 'utf-8'));
  }
  catch (e) {
    // ignore
  }

  return _.merge(appConfig, envAppConfig);
}
