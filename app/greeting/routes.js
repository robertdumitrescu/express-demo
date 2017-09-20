module.exports = registerRoutes;

function registerRoutes({route}) {
  const express = require('express');

  const routes = express.Router();

  const GreetingController = require('./GreetingController');
  routes.get('/', route.create(GreetingController, GreetingController.prototype.greet));
  routes.get('/card', route.create(GreetingController, GreetingController.prototype.getCard));

  return routes;
}
