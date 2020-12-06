var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');  //POST

var app = express();

app.set('port', process.env.PORT || 3000);

//static 미들웨어
//http://localhost:3000/path/image/macbook.png
//'/path' : 요청 패스
app.use('/path', static(path.join(__dirname, 'public')));
//bodyparser 미들웨어
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    console.log('첫 번째 미들웨어 호출');
    //클라이언트가 요청한 값
    var paramId = req.body.id;//name이 id인 값
    var paramPw = req.body.password; //name이 password인 값
    
    res.writeHead('200', {"Content-Type":"text/html;charset=utf-8"});
    res.write('<h1>EXPRESS 서버에서 응답한 결과입니다.');
    res.write('<div><p>param ID : ' + paramId +'</p></div>');
    res.write('<div><p>param PW : ' + paramPw +'</p></div>');
    res.end();
    
});


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});            