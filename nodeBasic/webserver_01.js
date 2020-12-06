var http = require('http');

var server = http.createServer();

var host = 'localhost'; //아이피를 넣어준다
var port = 8009;

server.listen(port, host, '50000',function(){   //'50000' : 동시에 접속할 수 있는 클라이언트 수
    console.log(port+'포트가 실행되었습니다.' +host+':'+port);
});

server.on('connection', function(socket){
    console.log('클라이언트가 접속했습니다.');
    
});
server.on('request',function(req, res){ 
    console.log('클라이언트 요청이 들어왔습니다.');
    //console.dir(req);   //요청 정보
    
    //파일 읽기
    var fs = require('fs'); //file system모듈 불러옴.
    var filename = 'macbook.png';
    fs.readFile(filename, function(err, data){
        res.writeHead(200, {"Content-Type" : "image/png"});
        res.write(data);
        res.end();
        
    });
    /* 왜 에러나는지 모르겠당.. 다시 알아보기
    _http_outgoing.js:661
    throw new ERR_INVALID_ARG_TYPE('first argument',
    ^
TypeError [ERR_INVALID_ARG_TYPE]: The first argument must be of type string or an instance of Buffer. Received undefined
    at write_ (_http_outgoing.js:661:11)
    at ServerResponse.write (_http_outgoing.js:629:15)
    at ReadFileContext.callback (C:\nodejs-mongoDB\nodejs-mongoDB\webserver_01.js:25:13)
    at FSReqCallback.readFileAfterOpen [as oncomplete] (fs.js:257:13) {
  code: 'ERR_INVALID_ARG_TYPE'
}*/
    
    
    
  /*res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});    //응답
    res.write('<h1>웹서버로부터 받은 응답</h1>');
    res.end();*/
    
});