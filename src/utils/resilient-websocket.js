export default class ResilientWebSocket {
  constructor(...args) {
    this._autoReconnectInterval = 5 * 1000; // ms
    this._pingInterval = 30 * 1000; // ms
    this._wsArgs = args;
    this._createWs();
  }

  close(...args) {
    this.ws.close(...args);
  }

  send(...args) {
    this.ws.send(...args);
  }

  onclose() {}
  onerror() {}
  onmessage() {}
  onopen() {}
  ondisconnect() {}

  // Override this to renew arguments (e.g. auth token) used when reconnecting
  // the websocket after disconnection
  async renewArgs() {
    return this._wsArgs;
  }

  _createWs() {
    this.ws = new WebSocket(...this._wsArgs);

    this.ws.onopen = this._handleOnOpen.bind(this);
    this.ws.onmessage = (...args) => this.onmessage(...args);

    this.ws.onclose = this._handleOnClose.bind(this);
    this.ws.onerror = this._handleOnError.bind(this);
  }

  _handleOnOpen(...args) {
    this._pingTimer = setTimeout(this._ping.bind(this), this._pingInterval);
    this.onopen(...args);
  }

  _handleOnClose(ev) {
    clearTimeout(this._pingTimer);

    if (ev.code !== 1000) {
      this._reconnect(); // 1000 is a normal disconnect
    } else {
      this.onclose();
    }
  }

  _handleOnError(ev) {
    if (ev.code === 'ECONNREFUSED') {
      this._reconnect();
    } else {
      this.onerror(ev);
    }
  }

  _ping() {
    this.ws.send('️💓');
    this._pingTimer = setTimeout(this._ping.bind(this), this._pingInterval);
  }

  _reconnect() {
    const cb = async () => {
      console.log('ResilientWebSocket: reconnecting…');
      this._wsArgs = await this.renewArgs();
      this._createWs();
    };

    this.ondisconnect();

    setTimeout(cb.bind(this), this._autoReconnectInterval);
  }
}
