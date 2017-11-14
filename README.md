# Things Scene을 위한 Stomp 데이타소스 컴포넌트
## 개념
* Stomp 웹소켓 프로토콜로 Subject(Queue)를 서브스크라이브 한다.
* 데이타 확산(Spread)는 데이터 바인딩에서 설정한다.
* 데이타 형식은 Plain Text와 JSON 형식을 지원한다.
## 설정
### RabbitMQ의 Stomp-Websocket 플러그인을 사용한 경우
* url : http://{hostname}:{port:15674}/stomp
* login : username
* passcode : password
* subject : subject
* data-format : Plain Text 또는 JSON
* debug : console에 debug 정보를 출력할 지를 선택
## Rabbit MQ의 Stomp-Websocket 플러그인을 사용하는 경우 메시지 Exchange
```
Rabbit MQ의 Stomp-Websocket 플러그인을 사용하는 경우,
Subject 속성과 동일한 AMQP의 Queue로 보낸 메시지를 받게된다.

Rabbit MQ의 AMQP를 사용해서 Stomp Data Source에서 받을 수 있도록 하려면,
아래의 javascript 샘플 코드를 참조하라.
```
```
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://hatiolab:hatiolab@mq.hatiolab.com', function(err, conn) {
  if(err) {
    console.error(err);
    return;
  }

  conn.createChannel(function (err, ch) {
    // q 이름을 subject 속성과 동일하게.
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
