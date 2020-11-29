//EXPRESS web server 만들기
//npm install express --save
var express = require('express');
var http = require('http');

var app = express();    //익스프레스 서버 객체
app.set('port', process.env.PORT || 3000);
//포트값을 환경변수 포트 값이 있으면 그걸 사용하고 없으면 3000 사용한다

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port')) ;  
}); //익스프레스를 이용해서 웹서버를 만듬

//클라이언트 요청 > 미들웨어 > 라우터