/*

npm install express --save
npm install http --save
npm install path --save
npm install body-parser --save
npm install cookie-parser --save
npm install serve-static --save
npm install errorhandler --save
npm install express-error-handler --save
npm install express-session --save
npm install mongodb --save
*/

//Express 기본 모듈 불러오기
var express = require('express')
    ,http = require('http')
    ,path = require('path');


//Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static')
    , errirHandler = require('errorhandler');


//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');


//Session 미들웨어 불러오기
var expressSession = require('express-session');


//익스프레스 객체 생성
var app = express();


//서버에서 사용할 포트 정보를 설정함
app.set('port', process.env.PORT || 3000);


//use() : 모듈을 사용할 수 있도록 만들어주는 메소드
//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));


//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());


//public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));


//public 폴더를 static으로 오픈
app.use(cookieParser());


//세션 설정
app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized : true
}));



//라우터
//라우터 객체 참조
var router = express.Router();


var MongoClient = require('mongodb').MongoClient;

//데이터베이스 객체를 위한 변수 선언
var database;

//데이터베이스 연결
function connectDB(){
    //데이터베이스 연결 정보
    //형식 : mongobd://%IP정보%:%포트정보%/%데이터베이스이름%
    var databaseURL = 'mongodb://localhost:27017/local';

    //데이터베이스 연결
    //connect(연결URL, callback함수)
    MongoClient.connect(databaseURL, function(err, db){

        if (err) throw err;

        console.log('데이터베이스에 연결되었습니다. : ' + databaseURL);

        //datacase 변수에 할당
        database = db;
    });
}

//로그인 라우팅 함수 - 데이터베이스 정보의 비교
router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출됨');

});


//라우터 객체 등록
app.use('/', router);


//===== 404 오류 페이지 처리 =====//
var errorHandler = expressErrorHandler({
    static:{
        '404' : './public/404/html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//===== 서버 시작 =====/
http.createServer(app).listen(app.get('port'), function(){

    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    //데이터베이스 연결
    connectDB();
});



//mongoDB 실행
// cmd > cd C:\Program Files\MongoDB\Server\4.4\bin > mongod --dbpath/Users/user/database/local


