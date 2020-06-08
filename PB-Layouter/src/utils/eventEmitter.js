export class EventEmitter {
  _events = {};

  emit(name, ...data) {
    if (!this._events[name]) {
      return;
    }
    this._events[name].forEach((cbk) => {
      cbk.fun(...data);
      if (cbk.count > 0) {
        cbk.count -= 1;
      }
    });
    this._events[name] = this._events[name].filter(cbk => cbk.count !== 0);
  }

  on(name, fun, count = -1) {
    if (!name) {
      return;
    }
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push({
      fun: fun,
      count: count
    });
  }

  once(name, fun) {
    this.on(name, fun, 1);
  }

  off(name){
    Object.keys(this._events).forEach(nameKey => {
      if(nameKey.indexOf(name) === 0) {
        this._events[name] = [];
      }
    })
  }
}

export default new EventEmitter();
