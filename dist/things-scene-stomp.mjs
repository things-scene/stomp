import{DataSource as e,RectPath as t,Shape as n,Component as i}from"@hatiolab/things-scene";var r="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},o=require("./transport-list");module.exports=require("./main")(o),"_sockjs_onload"in r&&setTimeout(r._sockjs_onload,1);var s=Object.freeze({}),c="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var a,u=function(e,t){return e(t={exports:{}},t.exports),t.exports}(function(e,t){(function(){var e,n,i,r,o={}.hasOwnProperty,s=[].slice;e={LF:"\n",NULL:"\0"},i=function(){var t;function n(e,t,n,i){this.command=e,this.headers=null!=t?t:{},this.body=null!=n?n:"",this.escapeHeaderValues=null!=i&&i}return n.prototype.toString=function(){var t,i,r,s,c;for(i in t=[this.command],(s=!1===this.headers["content-length"])&&delete this.headers["content-length"],r=this.headers)o.call(r,i)&&(c=r[i],this.escapeHeaderValues&&"CONNECT"!==this.command&&"CONNECTED"!==this.command?t.push(i+":"+n.frEscape(c)):t.push(i+":"+c));return this.body&&!s&&t.push("content-length:"+n.sizeOfUTF8(this.body)),t.push(e.LF+this.body),t.join(e.LF)},n.sizeOfUTF8=function(e){return e?encodeURI(e).match(/%..|./g).length:0},t=function(t,i){var r,o,s,c,a,u,l,p,d,h,f,b,g,m,y,v,w,S;for(null==i&&(i=!1),c=t.search(RegExp(""+e.LF+e.LF)),s=(a=t.substring(0,c).split(e.LF)).shift(),u={},S=function(e){return e.replace(/^\s+|\s+$/g,"")},d=0,b=(m=a.reverse()).length;d<b;d++)p=(g=m[d]).indexOf(":"),u[S(g.substring(0,p))]=i&&"CONNECT"!==s&&"CONNECTED"!==s?n.frUnEscape(S(g.substring(p+1))):S(g.substring(p+1));if(r="",w=c+2,u["content-length"])f=parseInt(u["content-length"]),r=(""+t).substring(w,w+f);else for(o=null,l=h=y=w,v=t.length;(y<=v?h<v:h>v)&&(o=t.charAt(l))!==e.NULL;l=y<=v?++h:--h)r+=o;return new n(s,u,r,i)},n.unmarshall=function(n,i){var r,o,s,c;return null==i&&(i=!1),o=n.split(RegExp(""+e.NULL+e.LF+"*")),(c={frames:[],partial:""}).frames=function(){var e,n,s,c;for(c=[],e=0,n=(s=o.slice(0,-1)).length;e<n;e++)r=s[e],c.push(t(r,i));return c}(),(s=o.slice(-1)[0])===e.LF||-1!==s.search(RegExp(""+e.NULL+e.LF+"*$"))?c.frames.push(t(s,i)):c.partial=s,c},n.marshall=function(t,i,r,o){return new n(t,i,r,o).toString()+e.NULL},n.frEscape=function(e){return(""+e).replace(/\\/g,"\\\\").replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/:/g,"\\c")},n.frUnEscape=function(e){return(""+e).replace(/\\r/g,"\r").replace(/\\n/g,"\n").replace(/\\c/g,":").replace(/\\\\/g,"\\")},n}(),n=function(){var t;function n(e){this.ws_fn=function(){var t;return(t=e()).binaryType="arraybuffer",t},this.reconnect_delay=0,this.counter=0,this.connected=!1,this.heartbeat={outgoing:1e4,incoming:1e4},this.maxWebSocketFrameSize=16384,this.subscriptions={},this.partialData=""}return n.prototype.debug=function(e){var t;return"undefined"!=typeof window&&null!==window&&null!=(t=window.console)?t.log(e):void 0},t=function(){return Date.now?Date.now():(new Date).valueOf},n.prototype._transmit=function(e,t,n){var r;for(r=i.marshall(e,t,n,this.escapeHeaderValues),"function"==typeof this.debug&&this.debug(">>> "+r);;){if(!(r.length>this.maxWebSocketFrameSize))return this.ws.send(r);this.ws.send(r.substring(0,this.maxWebSocketFrameSize)),r=r.substring(this.maxWebSocketFrameSize),"function"==typeof this.debug&&this.debug("remaining = "+r.length)}},n.prototype._setupHeartbeat=function(n){var i,o,s,c,a,u,l;if((i=n.version)===r.VERSIONS.V1_1||i===r.VERSIONS.V1_2)return c=(o=function(){var e,t,i,r;for(r=[],e=0,t=(i=n["heart-beat"].split(",")).length;e<t;e++)u=i[e],r.push(parseInt(u));return r}())[0],s=o[1],0!==this.heartbeat.outgoing&&0!==s&&(a=Math.max(this.heartbeat.outgoing,s),"function"==typeof this.debug&&this.debug("send PING every "+a+"ms"),this.pinger=r.setInterval(a,(l=this,function(){return l.ws.send(e.LF),"function"==typeof l.debug?l.debug(">>> PING"):void 0}))),0!==this.heartbeat.incoming&&0!==c?(a=Math.max(this.heartbeat.incoming,c),"function"==typeof this.debug&&this.debug("check PONG every "+a+"ms"),this.ponger=r.setInterval(a,function(e){return function(){var n;if((n=t()-e.serverActivity)>2*a)return"function"==typeof e.debug&&e.debug("did not receive server activity for the last "+n+"ms"),e.ws.close()}}(this))):void 0},n.prototype._parseConnect=function(){var e,t,n,i,r;if(r={},(e=1<=arguments.length?s.call(arguments,0):[]).length<2)throw"Connect requires at least 2 arguments";if("function"==typeof e[1])r=e[0],n=e[1],i=e[2],t=e[3];else switch(e.length){case 6:r.login=e[0],r.passcode=e[1],n=e[2],i=e[3],t=e[4],r.host=e[5];break;default:r.login=e[0],r.passcode=e[1],n=e[2],i=e[3],t=e[4]}return[r,n,i,t]},n.prototype.connect=function(){var e,t;return e=1<=arguments.length?s.call(arguments,0):[],this.escapeHeaderValues=!1,t=this._parseConnect.apply(this,e),this.headers=t[0],this.connectCallback=t[1],this.errorCallback=t[2],this.closeEventCallback=t[3],this._active=!0,this._connect()},n.prototype._connect=function(){var n,o,s,c,a;if(c=this.headers,s=this.errorCallback,o=this.closeEventCallback,this._active)return"function"==typeof this.debug&&this.debug("Opening Web Socket..."),this.ws=this.ws_fn(),n=function(e){var t,n,i,r,o,s;for(s="",o=e.length,r=0;r<o;)switch((t=e[r++])>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:s+=String.fromCharCode(t);break;case 12:case 13:n=e[r++],s+=String.fromCharCode((31&t)<<6|63&n);break;case 14:n=e[r++],i=e[r++],s+=String.fromCharCode((15&t)<<12|(63&n)<<6|(63&i)<<0)}return s},this.ws.onmessage=(a=this,function(o){var c,u,l,p,d,h,f,b,g,m,y;if(l="undefined"!=typeof ArrayBuffer&&o.data instanceof ArrayBuffer?(c=new Uint8Array(o.data),"function"==typeof a.debug&&a.debug("--- got data length: "+c.length),n(c)):o.data,a.serverActivity=t(),l!==e.LF)for("function"==typeof a.debug&&a.debug("<<< "+l),y=i.unmarshall(a.partialData+l,a.escapeHeaderValues),a.partialData=y.partial,d=0,h=(g=y.frames).length;d<h;d++)switch((p=g[d]).command){case"CONNECTED":if("function"==typeof a.debug&&a.debug("connected to server "+p.headers.server),a.connected=!0,a.version=p.headers.version,a.version===r.VERSIONS.V1_2&&(a.escapeHeaderValues=!0),!a._active)return void a.disconnect();a._setupHeartbeat(p.headers),"function"==typeof a.connectCallback&&a.connectCallback(p);break;case"MESSAGE":m=p.headers.subscription,(b=a.subscriptions[m]||a.onreceive)?(u=a,f=a.version===r.VERSIONS.V1_2?p.headers.ack:p.headers["message-id"],p.ack=function(e){return null==e&&(e={}),u.ack(f,m,e)},p.nack=function(e){return null==e&&(e={}),u.nack(f,m,e)},b(p)):"function"==typeof a.debug&&a.debug("Unhandled received MESSAGE: "+p);break;case"RECEIPT":p.headers["receipt-id"]===a.closeReceipt?(a.ws.onclose=null,a.ws.close(),a._cleanUp(),"function"==typeof a._disconnectCallback&&a._disconnectCallback()):"function"==typeof a.onreceipt&&a.onreceipt(p);break;case"ERROR":"function"==typeof s&&s(p);break;default:"function"==typeof a.debug&&a.debug("Unhandled frame: "+p)}else"function"==typeof a.debug&&a.debug("<<< PONG")}),this.ws.onclose=function(e){return function(t){var n;return n="Whoops! Lost connection to "+e.ws.url,"function"==typeof e.debug&&e.debug(n),"function"==typeof o&&o(t),e._cleanUp(),"function"==typeof s&&s(n),e._schedule_reconnect()}}(this),this.ws.onopen=function(e){return function(){return"function"==typeof e.debug&&e.debug("Web Socket Opened..."),c["accept-version"]=r.VERSIONS.supportedVersions(),c["heart-beat"]=[e.heartbeat.outgoing,e.heartbeat.incoming].join(","),e._transmit("CONNECT",c)}}(this);this.debug("Client has been marked inactive, will not attempt to connect")},n.prototype._schedule_reconnect=function(){if(this.reconnect_delay>0)return"function"==typeof this.debug&&this.debug("STOMP: scheduling reconnection in "+this.reconnect_delay+"ms"),this._reconnector=setTimeout((e=this,function(){return e.connected?"function"==typeof e.debug?e.debug("STOMP: already connected"):void 0:("function"==typeof e.debug&&e.debug("STOMP: attempting to reconnect"),e._connect())}),this.reconnect_delay);var e},n.prototype.disconnect=function(e,t){var n;if(null==t&&(t={}),this._disconnectCallback=e,this._active=!1,this.connected){t.receipt||(t.receipt="close-"+this.counter++),this.closeReceipt=t.receipt;try{return this._transmit("DISCONNECT",t)}catch(e){return n=e,"function"==typeof this.debug?this.debug("Ignoring error during disconnect",n):void 0}}},n.prototype._cleanUp=function(){if(this._reconnector&&clearTimeout(this._reconnector),this.connected=!1,this.subscriptions={},this.partial="",this.pinger&&r.clearInterval(this.pinger),this.ponger)return r.clearInterval(this.ponger)},n.prototype.send=function(e,t,n){return null==t&&(t={}),null==n&&(n=""),t.destination=e,this._transmit("SEND",t,n)},n.prototype.subscribe=function(e,t,n){var i;return null==n&&(n={}),n.id||(n.id="sub-"+this.counter++),n.destination=e,this.subscriptions[n.id]=t,this._transmit("SUBSCRIBE",n),i=this,{id:n.id,unsubscribe:function(e){return i.unsubscribe(n.id,e)}}},n.prototype.unsubscribe=function(e,t){return null==t&&(t={}),delete this.subscriptions[e],t.id=e,this._transmit("UNSUBSCRIBE",t)},n.prototype.begin=function(e){var t,n;return n=e||"tx-"+this.counter++,this._transmit("BEGIN",{transaction:n}),t=this,{id:n,commit:function(){return t.commit(n)},abort:function(){return t.abort(n)}}},n.prototype.commit=function(e){return this._transmit("COMMIT",{transaction:e})},n.prototype.abort=function(e){return this._transmit("ABORT",{transaction:e})},n.prototype.ack=function(e,t,n){return null==n&&(n={}),this.version===r.VERSIONS.V1_2?n.id=e:n["message-id"]=e,n.subscription=t,this._transmit("ACK",n)},n.prototype.nack=function(e,t,n){return null==n&&(n={}),this.version===r.VERSIONS.V1_2?n.id=e:n["message-id"]=e,n.subscription=t,this._transmit("NACK",n)},n}(),(r={VERSIONS:{V1_0:"1.0",V1_1:"1.1",V1_2:"1.2",supportedVersions:function(){return"1.2,1.1,1.0"}},client:function(e,t){return null==t&&(t=["v10.stomp","v11.stomp","v12.stomp"]),new n(function(){return new(r.WebSocketClass||WebSocket)(e,t)})},over:function(e){return new n("function"==typeof e?e:function(){return e})},Frame:i}).setInterval=function(e,t){return setInterval(t,e)},r.clearInterval=function(e){return clearInterval(e)},null!==t&&(t.Stomp=r),"undefined"!=typeof window&&null!==window?window.Stomp=r:t||(self.Stomp=r)}).call(c)}),l=(u.Stomp,"Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455."),p=["websocket","websockets","socket","networking","comet","push","RFC-6455","realtime","server","client"],d="Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",h=["Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"],f={type:"git",url:"https://github.com/theturtle32/WebSocket-Node.git"},b="https://github.com/theturtle32/WebSocket-Node",g={node:">=0.10.0"},m={debug:"^2.2.0",nan:"^2.11.0","typedarray-to-buffer":"^3.1.5",yaeti:"^0.0.6"},y={"buffer-equal":"^1.0.0",faucet:"^0.0.1",gulp:"git+https://github.com/gulpjs/gulp.git#4.0","gulp-jshint":"^2.0.4","jshint-stylish":"^2.2.1",jshint:"^2.0.0",tape:"^4.9.1"},v={verbose:!1},w={install:"(node-gyp rebuild 2> builderror.log) || (exit 0)",test:"faucet test/unit",gulp:"gulp"},S={lib:"./lib"},A={name:"websocket",description:l,keywords:p,author:d,contributors:h,version:"1.0.28",repository:f,homepage:b,engines:g,dependencies:m,devDependencies:y,config:v,scripts:w,main:"index",directories:S,browser:"lib/browser.js",license:"Apache-2.0"},k=((a=Object.freeze({name:"websocket",description:l,keywords:p,author:d,contributors:h,version:"1.0.28",repository:f,homepage:b,engines:g,dependencies:m,devDependencies:y,config:v,scripts:w,main:"index",directories:S,browser:"lib/browser.js",license:"Apache-2.0",default:A}))&&a.default||a).version,C=function(){return this}(),_=C.WebSocket||C.MozWebSocket;function E(e,t){return t?new _(e,t):new _(e)}_&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach(function(e){Object.defineProperty(E,e,{get:function(){return _[e]}})});var N={w3cwebsocket:_?E:null,version:k},I=u.Stomp,O=u.Stomp.over,V=u.Stomp.client;"function"!=typeof WebSocket&&(u.Stomp.WebSocketClass=N.w3cwebsocket),I.over=O,I.client=V;const x={mutable:!1,resizable:!0,rotatable:!0,properties:[{type:"string",label:"url",name:"url",property:"url",placeholder:"http://127.0.0.1:15674/stomp"},{type:"string",label:"subject",name:"subject",property:"subject"},{type:"string",label:"login",name:"login",property:"login"},{type:"string",label:"passcode",name:"passcode",property:"passcode"},{type:"select",label:"data-format",name:"dataFormat",property:{options:[{display:"Plain Text",value:"text"},{display:"JSON",value:"json"}]}},{type:"checkbox",label:"debug",name:"debug",property:"debug"}]},z="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABOCAMAAADcmSJQAAAAUVBMVEVHcEwzMzNmZmbMzMwAAAA0AAA0ADSZmZn///8zNAAAHzMANABnAABnMzJnMWdnMwCaZJpmZzAxZkxnADOaZmVkmmTL/8rNmM0zMmf/zMuXzM2XfcQdAAAAAXRSTlMAQObYZgAAA5RJREFUeF7tmdl22zoMRXMOAFIek7S94/9/aFWRXFBM0zbV0KsP2XRe5NhbGATJ0kvhiy8kYobyXOtEaIbTE4OlrqA8V+tAnlRahTrPiVmW0gKXZkyfqVgc6e8CQEeZqbdAbeYzvBoAHWOGam/IGj9DrHcwFzsRqogjxR5yDQaL9ZoY5BPEtZkyYRZHAlE2itFvBhmZCq3bax211wyeiTxwyO1N3isG35k/9CvLE1QH5Lo2787kGTqDxStx6ymL2mUmeT6k2vo1AuM0SOxmEldbjjJGbMUDNXXwA6qIwJIC2V7jNuHq0JYpnTQkJvUAsQIIF1sik88vkzhAnGPG5RyBlvoKVDuyrQ8DD9rniC6RIvXaCHExu3dGZ1gOqt4id2hztlN6zzyVCxJJG6Wrq6f0lY9oy1EFqAZ6nNTEppME8djg2vvxvIbCbeJ6FLU2A/X/4cf//3VfkaDZPqq1A7iyFWSE6j/94sdnyLUhBsY3+uzoEZMPWUPzuNpt+DmnM7zb2PgWGiUB+f5v6q8N4mZvNd+wouaZsLIPUuQikYBihtIWR3fANZi5P0D57odXA3CqvaIzolsIBwC297TcIH6euLQ3zBu+x8xFDN0IFsJhfgW9Ca+KqZtBotp8/ustigjZiBk6M1F/hyXmxltvf5ezJqQhHgUkV5KjxNAGFF2Q6jJAYv8PxpqgTVJgrCOW/g6qOeg9pipi0TscAgrozbQTuyJ2wg6O7TtqUZALsUzq9ATv6EPgYoDESbaM6oCAQ4A+av1QZdFknqIOBvhQZeats1o4VIsPuZb1W1EiMUyb8IBH41rDqq+hCh2KlWjtZKsiM+9QGBasa3FcjU2UTs9DwcZocVxWJS7sbY9EOHyKNSXyZGnZSqwzR6hpBRQFxe/k2Io3DUkXW86DmbWHFHr2Atmavrws0xSwi09l4Zh3zcxz0MxEqcm8tFzpBUVlzcsfpKwjPlm1UhZgN3bC9r4bju0rbU6zUl6qiNsrvOblmbhJHSzMqisQb/VqpcTvTM0Mtguv33ffd2U3dmbQxm7kdlp5/cbMWnwMrzdWI6Acki+z/PJNbl2nuerq64neaZM7FcpWazwMLRVpfVzbtCpUmlIdxBt3QEyv2c1PoSISI8nTN8DHoA+BfavzKLceEDuWXwVsfJDRvoXu7jbbxVDw7g3sSQi0L4ZrBK1RScYo8tKHSCRBZLh8Sft/l9fM9PLH8sVPxYRe1ylX8kMAAAAASUVORK5CYII=";class M extends(e(t(n))){static get image(){return M._image||(M._image=new Image,M._image.src=z),M._image}added(){this.app.isViewMode&&this._initStomp()}_initStomp(){var{url:e,debug:t=!1,subject:n,login:i,passcode:r,dataFormat:o="text"}=this.model,c=new s(e);this._client=O(c),t||(this._client.debug=(()=>{})),this._client.connect(i,r,()=>{console.info("Stomp connected!"),this._client.subscribe(n,e=>{this.data=this._convertDataFormat(e.body,o)})},()=>{console.info("Stomp connect failed!")},"/")}dispose(){try{this._client&&this._client.connected&&this._client.disconnect(()=>console.info("stomp subscrition disconnected"))}catch(e){console.error(e)}delete this._client,super.dispose()}disconnect(){}_draw(e){var{left:t,top:n,width:i,height:r}=this.bounds;e.beginPath(),e.drawImage(M.image,t,n,i,r)}get nature(){return x}}i.register("stomp",M);export{M as Stomp};
