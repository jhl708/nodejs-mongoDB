//기본모듈
var express = require('express');
var http = require('http');
var path = require('path');

//미들웨어 불러오기
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');

//오류 핸들러 모둘
var expressErrorHandler = require('express-error-handler');

//session 미들웨어
var expressSession = require('express-session');

//익스프레스 객체 생성
var app = express();

//서버에서 사용할 포트 정보
app.set('port', process.env.PORT || 2147);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
//세션 설정
app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized : true
}));















var errorHandler = expressErrorHandler({
    static : {'404' : 'public/404.html'}
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//EXPRESS 서버 시작!
http.createServer(app).listen(app.get('port', function(){
    console.log('서버가 시작되었습니다.. 포트번호 : ' + app.get('port'));
    
}));
