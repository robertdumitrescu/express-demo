class ControllerRouteFactory {
  constructor({di, logger}) {
    this._di = di;
    this._logger = logger;
  }

  create(Controller, method) {
    return async (request, response, next) => {
      this._logger.debug(`${request.method}\t${request.originalUrl} using ${Controller.name}.${method.name}`);
      try {
        let output = method.apply(new Controller(this._di.get()), [{
          request: request,
          response: response,
          next: next
        }]);

        if (output instanceof Promise) {
          output = await output;
        }

        let statusCode = response.statusCode || 200;

        if (typeof output === 'object') {
          response.status(statusCode).json(output);
        }
        else {
          response.status(statusCode).send(output);
        }
      }
      catch (e) {
        this._logger.error(e);
        response.status(500).json({error: e.message});
      }

      this._logger.debug(`${response.statusCode}`);
    };
  }
}

module.exports = ControllerRouteFactory;
