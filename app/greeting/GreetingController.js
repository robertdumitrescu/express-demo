class GreetingController {
  constructor({greetingService}) {
    this._greetingService = greetingService;
  }

  greet({request}) {
    return {message: this._greetingService.greet(request.query.name)};
  }

  async getCard({request}) {
    return this._greetingService.getCard(request.query.name);
  }
}

module.exports = GreetingController;
