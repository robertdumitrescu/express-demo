class GreetingService {
  constructor({appConfig, logger, fs, path}) {
    this._appConfig = appConfig;
    this._logger = logger;
    this._fs = fs;
    this._path = path;
    this._cardDir = this._path.join(__dirname, 'cards');
  }

  greet(name) {
    if (!name) {
      throw new Error('name is required');
    }
    return `${this._appConfig.greeting}, ${name}`;
  }

  async getCard(card) {
    return new Promise((resolve, reject) => {
      let cardPath = this._path.join(this._cardDir, `${card}.md`);
      this._logger.debug(cardPath);
      this._fs.readFile(cardPath, 'utf-8', (error, content) => {
        if (error) {
          return reject(new Error('card not found'));
        }
        resolve(content);
      });
    });
  }
}

module.exports = GreetingService;
