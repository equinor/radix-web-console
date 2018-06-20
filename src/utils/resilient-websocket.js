export default class ResilientWebSocket {
  constructor(...args) {
    this._autoReconnectInterval = 5 * 1000; // ms
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

  _createWs() {
    this.ws = new WebSocket(...this._wsArgs);

    this.ws.onopen = (...args) => this.onopen(...args);
    this.ws.onmessage = (...args) => this.onmessage(...args);

    this.ws.onclose = this._handleOnClose.bind(this);
    this.ws.onerror = this._handleOnError.bind(this);
  }

  _handleOnClose(ev) {
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

  _reconnect() {
    const cb = () => {
      console.log('ResilientWebSocket: reconnecting…');
      this._createWs();
    };

    this.ondisconnect();

    setTimeout(cb.bind(this), this._autoReconnectInterval);
  }
}
