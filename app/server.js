const express = require('express');

const getConfig = require('./config');
const createLogger = require('./logger');
const ControllerRouteFactory = require('./ControllerRouteFactory');
const DependencyInjector = require('./DependencyInjector');
const GreetingService = require('./greeting/GreetingService');
const greetingRoutes = require('./greeting/routes');

let app = express();

const di = new DependencyInjector();

// register services
di.register('appConfig', getConfig(process.argv[2]));
di.register('logger', createLogger(di.get()));
di.register('route', new ControllerRouteFactory(di.get()));
di.register('greetingService', (di) => new GreetingService(di.get()));
// end register services

// register routes
app.use('/greeting', greetingRoutes(di.get()));
// end register routes

app.use(express.static('./'));

app.listen(3000);
