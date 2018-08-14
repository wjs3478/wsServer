var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (req, res) {
  console.log('Received request for ' + req.url);
  res.writeHead(404);
  res.end();
});

server.listen(7070, function () {
  console.log('Server is listening on port 7070');
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});


let agent=new Set();
let clients=[]
let agt;
let chatdata=[];


wsServer.on('connect', function (webSocketConnection) {
  console.log("연결")
  
  //console.log(webSocketConnection)
});


wsServer.on('request', function (request) {
  var connection = request.accept('example-chat', request.origin);
  const ip=connection.remoteAddress
  

  let index=clients.push(connection)-1;
  console.log("인덱스 먼데")
  console.log(index)
  console.log("아이피"+ip)
  console.log(request.host)
  console.log(agent)
  //console.log(connection.socket)
  
  


  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      
      console.log(message)

      //console.log(JSON.parse(message.utf8Data))
      let recMsg=JSON.parse(message.utf8Data)

      console.log(recMsg)
      
      let sendMsg;
      

      //상담사 로그인 -> 고객 메시지 보냄 -> 채팅방 만듬(데이터베이스) -> 상담사가 컨택함
      
            

      if(recMsg.type=='login')
      {
        agt=recMsg.agentid
        // agent.add({
        //           id:recMsg.agentid,
        //           agentName:recMsg.name
        //         })
        agent.add(agt)

      }else if(recMsg.type=='msg'){
        if(agent.length<0){
            sendMsg={
            cls:"revM"
            ,sendId:"시스템"
            ,msg:"잠시만 기다려주세요."
            }
            chatdata.push(sendMsg)
            connection.sendUTF(JSON.stringify(sendMsg));
          }
        else{
          sendMsg={
            cls:"revM",
            sendId:recMsg.sendId
            ,msg:recMsg.msg
            }

            for (var i=0; i < clients.length; i++) {
              if(clients[i]!=connection)
                clients[i].sendUTF(JSON.stringify(sendMsg));
            }
            //connection.sendUTF(JSON.stringify(sendMsg));
        }
          
      }

      //console.log('Received message: ' + JSON.parse(message.utf8Data));

      

      

      //connection.sendUTF(message.utf8Data);
      //console.log(sendMsg)
      
      
      
    }
    else if (message.type === 'binary') {
      connection.sendBytes(message.binaryData);
    }

      connection.on('close', function (reasonCode, description) {
        console.log('Peer ' + connection.remoteAddress + ' disconnected.')
        console.log("디스크립션"+description)
        console.log(agt)
        console.log("끊기는 얘")
        console.log(index)
        clients.splice(index, 1);
      
      });
    });
  });

  wsServer.on('close', function (webSocketConnection,reasonCode,description) {
    //console.log("연결 끊기: "+webSocketConnection)
    console.log("얘가 젤 먼저 연결 끊김")
    //console.log(webSocketConnection)
    //console.log("연결 끊기 코드: "+reasonCode)
    //console.log("이유: "+description)
  });