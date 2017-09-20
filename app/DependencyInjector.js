class DependencyInjector {
  constructor() {
    this._container = new Proxy({
      // self reference
      di: this
    }, {
      // dynamic get, default to require
      get: function(target, name) {
        return name in target ? target[name] : require(name);
      }
    });
  }

  register(name, value) {
    // could be lazy loaded and cached during an actual get call
    if (typeof value === 'function') {
      value = value(this);
    }
    this._container[name] = value;
  }

  get() {
    return this._container;
  }
}

module.exports = DependencyInjector;
