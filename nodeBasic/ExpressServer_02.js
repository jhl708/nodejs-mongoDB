//미들웨어 만들기
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3001);


//app 객체를 만든 후 use 메소드를 이용해 미들웨어를 등록한다.
app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출됨');
    req.user = 'hrhrhrhr';
    next();//첫번째 미들에어를 마친 후 두번째 미들웨어로 넘어감!
    
});//첫번째 미들웨어를 등록함

app.use(function(req, res, next){
    console.log('두번째 미들웨어 호출됨')
   
    res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    res.end('<h1>서버에서 응답한 결과입니다. : ' + req.user + '</h1>'); 
    next();
    //req.user : 첫번째 미들웨어에서 보내준 값
    //res.send로도 보낼 수 있음 > 더 간단한 방법
});//두번째 미들웨어를 등록함

app.use(function(req, res, next){
    console.log('세번째 미들웨어 호출됨');
    var znddl = {name : "쿵이", age : "9"};
    var znddlStr = JSON.stringify(znddl);
    res.send(znddlStr);    //배열 그대로 호출됨
    
});

var server = http.createServer(app).listen(app.get('port'), function(){                                    
    console.log('익스프레스로 웹 서버를 실행함!' + app.get('port'));
        });


