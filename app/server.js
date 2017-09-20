const express = require('express');

const appConfig = require('./appConfig');
const createLogger = require('./logger');
const ControllerRouteFactory = require('./ControllerRouteFactory');
const DependencyInjector = require('./DependencyInjector');
const GreetingService = require('./greeting/GreetingService');
const greetingRoutes = require('./greeting/routes');

let app = express();

const di = new DependencyInjector();

// register services
di.register('appConfig', appConfig);
di.register('logger', createLogger(di.get()));
di.register('route', new ControllerRouteFactory(di.get()));
di.register('greetingService', (di) => new GreetingService(di.get()));
// end register services

// register routes
app.use('/greeting', greetingRoutes(di.get()));
// end register routes

app.use(express.static('./'));

app.listen(3000);
