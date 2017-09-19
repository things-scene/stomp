/*
 * Copyright © 2017 HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'string',
    label: 'url',
    name: 'url',
    property: 'url'
  }, {
    type: 'string',
    label: 'subject',
    name: 'subject',
    property: 'subject'
  }]
}

const StompCli = require('stompjs')
const SockJS = require('sockjs-client')

const STOMP_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABOCAMAAADcmSJQAAAAUVBMVEVHcEwzMzNmZmbMzMwAAAA0AAA0ADSZmZn///8zNAAAHzMANABnAABnMzJnMWdnMwCaZJpmZzAxZkxnADOaZmVkmmTL/8rNmM0zMmf/zMuXzM2XfcQdAAAAAXRSTlMAQObYZgAAA5RJREFUeF7tmdl22zoMRXMOAFIek7S94/9/aFWRXFBM0zbV0KsP2XRe5NhbGATJ0kvhiy8kYobyXOtEaIbTE4OlrqA8V+tAnlRahTrPiVmW0gKXZkyfqVgc6e8CQEeZqbdAbeYzvBoAHWOGam/IGj9DrHcwFzsRqogjxR5yDQaL9ZoY5BPEtZkyYRZHAlE2itFvBhmZCq3bax211wyeiTxwyO1N3isG35k/9CvLE1QH5Lo2787kGTqDxStx6ymL2mUmeT6k2vo1AuM0SOxmEldbjjJGbMUDNXXwA6qIwJIC2V7jNuHq0JYpnTQkJvUAsQIIF1sik88vkzhAnGPG5RyBlvoKVDuyrQ8DD9rniC6RIvXaCHExu3dGZ1gOqt4id2hztlN6zzyVCxJJG6Wrq6f0lY9oy1EFqAZ6nNTEppME8djg2vvxvIbCbeJ6FLU2A/X/4cf//3VfkaDZPqq1A7iyFWSE6j/94sdnyLUhBsY3+uzoEZMPWUPzuNpt+DmnM7zb2PgWGiUB+f5v6q8N4mZvNd+wouaZsLIPUuQikYBihtIWR3fANZi5P0D57odXA3CqvaIzolsIBwC297TcIH6euLQ3zBu+x8xFDN0IFsJhfgW9Ca+KqZtBotp8/ustigjZiBk6M1F/hyXmxltvf5ezJqQhHgUkV5KjxNAGFF2Q6jJAYv8PxpqgTVJgrCOW/g6qOeg9pipi0TscAgrozbQTuyJ2wg6O7TtqUZALsUzq9ATv6EPgYoDESbaM6oCAQ4A+av1QZdFknqIOBvhQZeats1o4VIsPuZb1W1EiMUyb8IBH41rDqq+hCh2KlWjtZKsiM+9QGBasa3FcjU2UTs9DwcZocVxWJS7sbY9EOHyKNSXyZGnZSqwzR6hpBRQFxe/k2Io3DUkXW86DmbWHFHr2Atmavrws0xSwi09l4Zh3zcxz0MxEqcm8tFzpBUVlzcsfpKwjPlm1UhZgN3bC9r4bju0rbU6zUl6qiNsrvOblmbhJHSzMqisQb/VqpcTvTM0Mtguv33ffd2U3dmbQxm7kdlp5/cbMWnwMrzdWI6Acki+z/PJNbl2nuerq64neaZM7FcpWazwMLRVpfVzbtCpUmlIdxBt3QEyv2c1PoSISI8nTN8DHoA+BfavzKLceEDuWXwVsfJDRvoXu7jbbxVDw7g3sSQi0L4ZrBK1RScYo8tKHSCRBZLh8Sft/l9fM9PLH8sVPxYRe1ylX8kMAAAAASUVORK5CYII='

var { ValueHolder, RectPath, Shape } = scene

export default class Stomp extends ValueHolder(RectPath(Shape)) {

  static get image() {
    if (!Stomp._image) {
      Stomp._image = new Image()
      Stomp._image.src = STOMP_IMAGE
    }

    return Stomp._image
  }

  get client() {
    return this._client;
  }

  set client(client) {
    this._client = client;
  }

  get subscription() {
    return this._subscription;
  }

  set subscription(subscription) {
    this._subscription = subscription;
  }

  get subject() {
    return this.model.subject
  }

  set subject(subject) {
    this.model.subject = subject
  }

  get url() {
    return this.model.url
  }

  set url(url) {
    this.model.url = url
  }

  added() {
    if (!this.app.isViewMode)
      return;

    this._initStomp();
  }

  _initStomp() {

    this.disconnect()

    var socket = new SockJS(this.url);
    this.client = StompCli.over(socket);

    var self = this
    // this allows to display debug logs directly on the web page
    this.client.debug = function (str) {
      // console.log(str)
    };

    // the client is notified when it is connected to the server.
    // client.connect(login, passcode, function(frame) {
    this.client.connect({}, function (frame) {
      console.info("Stomp connected!")
      this._subscribe();
    }.bind(this));

    this._isStarted = true;

  }

  disposed() {
    // TODO: unsubscribe and stop polling interval timer
    this.disconnect();
  }

  _subscribe() {

    this.subscription = this.client.subscribe(this.subject, function (message) {
      var variables = JSON.parse(message.body);

      if (!variables)
        return

      for (var key in variables)
        this.root.variable(key, variables[key]);
    }.bind(this));
  }

  disconnect() {
    /* implementation for stomp */
    if (this.client) {
      if (this.client.connected) {
        this.client.disconnect(function () {
          console.info('stomp subscrition disconnected')
        });
      }

      this.client = null
    }

    this._isStarted = false;
  }

  _draw(context) {
    var {
      left,
      top,
      width,
      height
    } = this.bounds;

    context.beginPath();
    context.drawImage(Stomp.image, left, top, width, height);
  }

  get controls() { }

  get nature() {
    return NATURE;
  }
}

scene.Component.register('stomp', Stomp);
