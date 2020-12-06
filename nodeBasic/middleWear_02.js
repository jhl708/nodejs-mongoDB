//라우터 미들웨어
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');  

var app = express();

app.set('port', process.env.PORT || 3000);

//static 미들웨어
//http://localhost:3000/path/image/macbook.png
//'/path' : 요청 패스
app.use('/path', static(path.join(__dirname, 'public')));
//bodyparser 미들웨어
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//라우팅 함수 호출
var router = express.Router() ;

router.route('/process/login/:name').post(function(req, res){ //요청path를 등록함
    console.log('.process/login 라우팅 함수에서 받음.');
    
    var paramId = req.body.id;
    var paramPw = req.body.password;
    var paramName = req.params.name;
    
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    res.write('<h1>EXPRESS 서버에서 응답한 결과입니다.');
    res.write('<div><p>param ID : ' + paramId +'</p></div>');
    res.write('<div><p>param PW : ' + paramPw +'</p></div>');
    res.write('<div><p>param PW : ' + paramName +'</p></div>')
    res.end();
    
}); 

/*app.all('*', function(req, res){
    res.status(404).send('<h1>에러 페이지!!!!!!!!!!!!!!!</h1>');
});*/
app.use('/', router);




var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : ' + app.get('port'));
});            