# Stomp data source component for Things Scene

## Concept

- Subscribe Subject(Queue) via Stomp Web Socket protocol.
- Data Spread is set in data binding.
- The data format supports Plain Text and JSON format.

## Setting

### When use Stomp-Websocket Plug-in of RabbitMQ

- url : http://{hostname}:{port:15674}/stomp
- login : username
- passcode : password
- subject : subject
- data-format : Plain Text or JSON
- debug : Select whether to output debug information to console

## Message Exchange when use Stomp-Websocket Plug-in of Rabbit MQ

```
If use Stomp-Websocket Plug-in of Rabbit MQ,
you will receive a message sent via AMQP Queue which is the same as Subject property.

To receive from Stomp Data Source using AMQP of Rabbit MQ,
see the JavaScript sample code below.
```

```
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://hatiolab:hatiolab@mq.hatiolab.com', function(err, conn) {
  if(err) {
    console.error(err);
    return;
  }

  conn.createChannel(function (err, ch) {
    // Make the name of q the same as Subject property.
    var q = 'location';

    ch.assertQueue(q, { durable: true });

    var location = {
      x: 100,
      y: 200
    }

    ch.sendToQueue(q, new Buffer(JSON.stringify(location)));
  });
});
```

## node package를 설치한다.

`$ yarn`

## 실행

`$ yarn serve`
`$ yarn serve:dev`

## 포트를 바꾸려면, -p 3001 식으로 추가해준다.

`$ yarn serve`
`$ yarn serve -p 3001`

## test in browser

http://localhost:3000

## build

`$ yarn build`

| type | filename                 | for            | tested |
| ---- | ------------------------ | -------------- | ------ |
| UMD  | things-scene-stomp.js    | modern browser | X      |
| UMD  | things-scene-stomp-ie.js | ie 11          | 0      |
| ESM  | things-scene-stomp.mjs   | modern browser | X      |

## publish

`$ yarn publish`
