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
app.use('/mongoDB/public', static(path.join(__dirname, 'public')));


//public 폴더를 static으로 오픈
app.use(cookieParser());


//세션 설정
app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized : true
}));

//데이터베이스연결!!!!!!!!

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

        //database 변수에 할당
        //mongodb 3.0이상일 경우 DB이름 명시 필수!ㅂㄷㅂㄷ
        database = db.db('local');
    });
}


//라우팅 함수
//라우터 객체 참조
var router = express.Router();


// 사용자 추가 라우팅 함수 - 클라이언트에서 보낸 데이터를 이용해 데이터베이스에 추가
router.route('/process/adduser').post(function(req, res) {
	console.log('/process/adduser 호출됨.');
    
    //요청된 파라미터
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);
    
    //데이터베이스 객체 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if(database){
        console.dir(database);
       
        /*
         Null 과 Undefined 를 제외하면 위의 타입들은 전부 Object 의 인스턴스들이다. Object 의 인스턴스라는 말은 그 object 가(무엇이 되었든) [[prototype]] 프로퍼티를 가지고 있어 프로토타입 체이닝을 통해 Object.prototype 까지 도달할 수 있다는 뜻이 된다. 여기서 [[prototype]] 은 대부분의 브라우저 콘솔에서 확인할 수 있는 __proto__ 를 의미한다.
         
        */
        addUser(database, paramId, paramPassword, paramName, function(err, result){
            if(err){throw err;}
            
            //결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
            if(result && result.insertedCount > 0){
                console.dir(result);
                
            /*{

              result: { ok: 1, n: 1 },
              ops: [ { id: 'kkung!', password: '쿵이짱', name: '조쿵이', _id: [ObjectID] } ],
              insertedCount: 1,
              insertedIds: {
                '0': ObjectID { _bsontype: 'ObjectID', id: [Buffer [Uint8Array]] }
              }
            }*/
                
                res.writeHead('200', {'Content-Type' : 'text/html;charset=utf-8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type' : 'text/html;charset=utf-8'});
                res.write('<h2>사용자 추가 실페</h2>');
                res.end();
                
            }
        });
    }else{
        
        res.writeHead('200', {'Content-Type' : 'text/html;charset=utf-8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
	
});



//라우터 객체 등록
app.use('/', router);



//사용자 추가하기!!
var addUser = function (database, id, password, name, callback){
    
    console.log('addUser 호출됨 : '+ id + ', ' + password + ', ' + name);
    
    //'users' 컬렉션 참조
    var users = database.collection('users');
    
    //id, password, username을 사용해 사용자를 추가한다.
    //insertMany() : 데이터 추가 함수
    users.insertMany([{"id":id, "password":password, "name":name}], function(err, result){
        if(err){    //오류나면 콜백함수 호출 후 오류 객체 전달
            callback(err,null);
            return;
        }
        
        if(result.insertedCount > 0){
           console.log('사용자 레코드 추가됨' + result.insertedCount);
           
        }else{
            console.log('추가된 레코드 없음' + result.insertedCount);
        }
        
        callback(null, result);
    });
}

//===== 404 오류 페이지 처리 =====//
var errorHandler = expressErrorHandler({
    static:{
        '404' : 'mongoDB/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//===== EXPRESS 서버 시작 =====/
http.createServer(app).listen(app.get('port'), function(){

    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    //데이터베이스 연결
    connectDB();
});



//mongoDB 실행
// cmd > cd C:\Program Files\MongoDB\Server\4.4\bin > mongod --dbpath /Users/user/database/local

