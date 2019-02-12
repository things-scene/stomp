/*
 * Copyright © 2017 HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: "string",
      label: "url",
      name: "url",
      property: "url",
      placeholder: "http://127.0.0.1:15674/stomp"
    },
    {
      type: "string",
      label: "subject",
      name: "subject",
      property: "subject"
    },
    {
      type: "string",
      label: "login",
      name: "login",
      property: "login"
    },
    {
      type: "string",
      label: "passcode",
      name: "passcode",
      property: "passcode"
    },
    {
      type: "select",
      label: "data-format",
      name: "dataFormat",
      property: {
        options: [
          {
            display: "Plain Text",
            value: "text"
          },
          {
            display: "JSON",
            value: "json"
          }
        ]
      }
    },
    {
      type: "checkbox",
      label: "debug",
      name: "debug",
      property: "debug"
    }
  ]
};

import * as SockJS from "sockjs-client";
import * as StompCli from "@stomp/stompjs";

const STOMP_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABOCAMAAADcmSJQAAAAUVBMVEVHcEwzMzNmZmbMzMwAAAA0AAA0ADSZmZn///8zNAAAHzMANABnAABnMzJnMWdnMwCaZJpmZzAxZkxnADOaZmVkmmTL/8rNmM0zMmf/zMuXzM2XfcQdAAAAAXRSTlMAQObYZgAAA5RJREFUeF7tmdl22zoMRXMOAFIek7S94/9/aFWRXFBM0zbV0KsP2XRe5NhbGATJ0kvhiy8kYobyXOtEaIbTE4OlrqA8V+tAnlRahTrPiVmW0gKXZkyfqVgc6e8CQEeZqbdAbeYzvBoAHWOGam/IGj9DrHcwFzsRqogjxR5yDQaL9ZoY5BPEtZkyYRZHAlE2itFvBhmZCq3bax211wyeiTxwyO1N3isG35k/9CvLE1QH5Lo2787kGTqDxStx6ymL2mUmeT6k2vo1AuM0SOxmEldbjjJGbMUDNXXwA6qIwJIC2V7jNuHq0JYpnTQkJvUAsQIIF1sik88vkzhAnGPG5RyBlvoKVDuyrQ8DD9rniC6RIvXaCHExu3dGZ1gOqt4id2hztlN6zzyVCxJJG6Wrq6f0lY9oy1EFqAZ6nNTEppME8djg2vvxvIbCbeJ6FLU2A/X/4cf//3VfkaDZPqq1A7iyFWSE6j/94sdnyLUhBsY3+uzoEZMPWUPzuNpt+DmnM7zb2PgWGiUB+f5v6q8N4mZvNd+wouaZsLIPUuQikYBihtIWR3fANZi5P0D57odXA3CqvaIzolsIBwC297TcIH6euLQ3zBu+x8xFDN0IFsJhfgW9Ca+KqZtBotp8/ustigjZiBk6M1F/hyXmxltvf5ezJqQhHgUkV5KjxNAGFF2Q6jJAYv8PxpqgTVJgrCOW/g6qOeg9pipi0TscAgrozbQTuyJ2wg6O7TtqUZALsUzq9ATv6EPgYoDESbaM6oCAQ4A+av1QZdFknqIOBvhQZeats1o4VIsPuZb1W1EiMUyb8IBH41rDqq+hCh2KlWjtZKsiM+9QGBasa3FcjU2UTs9DwcZocVxWJS7sbY9EOHyKNSXyZGnZSqwzR6hpBRQFxe/k2Io3DUkXW86DmbWHFHr2Atmavrws0xSwi09l4Zh3zcxz0MxEqcm8tFzpBUVlzcsfpKwjPlm1UhZgN3bC9r4bju0rbU6zUl6qiNsrvOblmbhJHSzMqisQb/VqpcTvTM0Mtguv33ffd2U3dmbQxm7kdlp5/cbMWnwMrzdWI6Acki+z/PJNbl2nuerq64neaZM7FcpWazwMLRVpfVzbtCpUmlIdxBt3QEyv2c1PoSISI8nTN8DHoA+BfavzKLceEDuWXwVsfJDRvoXu7jbbxVDw7g3sSQi0L4ZrBK1RScYo8tKHSCRBZLh8Sft/l9fM9PLH8sVPxYRe1ylX8kMAAAAASUVORK5CYII=";

import { Component, DataSource, RectPath, Shape } from "@hatiolab/things-scene";

export default class Stomp extends DataSource(RectPath(Shape)) {
  static get image() {
    if (!Stomp._image) {
      Stomp._image = new Image();
      Stomp._image.src = STOMP_IMAGE;
    }

    return Stomp._image;
  }

  added() {
    if (!this.app.isViewMode) return;

    this._initStomp();
  }

  _initStomp() {
    var {
      url,
      debug = false,
      subject,
      login,
      passcode,
      dataFormat = "text"
    } = this.model;

    var socket = new SockJS(url);
    this._client = StompCli.over(socket);

    if (!debug) this._client.debug = () => {}; /* noop */

    this._client.connect(
      login,
      passcode,
      () => {
        /* on_connect */
        console.info("Stomp connected!");

        this._client.subscribe(subject, message => {
          this.data = this._convertDataFormat(message.body, dataFormat);
        });
      },
      () => {
        /* on_error */
        console.info("Stomp connect failed!");
      },
      "/"
    );
  }

  dispose() {
    try {
      this._client &&
        this._client.connected &&
        this._client.disconnect(() =>
          console.info("stomp subscrition disconnected")
        );
    } catch (e) {
      console.error(e);
    }

    delete this._client;

    super.dispose();
  }

  disconnect() {}

  _draw(context) {
    var { left, top, width, height } = this.bounds;

    context.beginPath();
    context.drawImage(Stomp.image, left, top, width, height);
  }

  get nature() {
    return NATURE;
  }
}

Component.register("stomp", Stomp);
