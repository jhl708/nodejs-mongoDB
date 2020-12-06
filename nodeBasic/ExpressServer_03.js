//익스프레스 요청 객체에 추가한 헤더와 파라미터 알아보기
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3002);

app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출됨');
    
    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;
    //localhost:3002/?name=??? 
    //paramName = ??? 값이 들어옴
    
    
    res.writeHead('200', {'Content-Type' : 'text/html;charset=utf-8'});
    res.write('<h1>Express에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    
   
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});