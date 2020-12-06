/*
npm install express
npm install http
npm install path
npm install body-parser
npm install cookie-parser
npm install express-session
npm install express-error-handler

*/



var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
//에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


var router = express.Router();



app.use('/', router);

//404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static:{
        '404':'./public/404.html'
    }
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});
