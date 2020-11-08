//1. 주소 문자열과 요청 파라미터 다루기
var url = require('url');   //url모듈 불러옴
var urlStr = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=2021+%EB%A7%A5%EB%B6%81';
url.parse(urlStr);          //parse(url정보);

var curUrl = url.parse(urlStr);
console.dir(curUrl);
/*url정보 보여줌
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'search.naver.com',
  port: null,
  hostname: 'search.naver.com',
  hash: null,
  search: '?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=2021+%EB%A7%A5%EB%B6%81',
  query: 'where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=2021+%EB%A7%A5%EB%B6%81',
  pathname: '/search.naver',
  path: '/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=2021+%EB%A7%A5%EB%B6%81',
  href: 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=2021+%EB%A7%A5%EB%B6%81'
}
*/
console.log('query : ' + curUrl.query); // ?뒤에 있는 문자 출력 : where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=2021+%EB%A7%A5%EB%B6%81

var curStr = url.format(curUrl);    //파싱된 url을 원복
console.log('url : ' + curStr);     //url : https://kkungspaw.tistory.com/1

var querystring = require('querystring');
var params = querystring.parse(curUrl.query);
console.log('검색어 : ' + params.query);       //검색어 : 2021 맥북


//2. 이벤트 이해하기
//이벤트 : 한 쪽 모듈에서 다른 쪽 모듈로 데이터 전달할때 사용
//emit()으로 데이터를 보내고 on()으로 받는 형식!

/*process.on('exit', function(){      //process : 전역변수
    console.log('exxit 이벤트 발생함.')   //3번째
});       

setTimeout(function(){
    console.log('2초 후에 실행됨');   //2번쨰 
    process.exit();     //: 여기서 exit이벤트 실행함
    
}, 2000);

console.log('1111먼저 실행됨');      //1번째*/
/*
1111먼저 실행됨
2초 후에 실행됨
exxit 이벤트 발생함.
*/


//emit() -> on()

process.on('tick', function(count){
           console.log('tick 이벤트 발생 : ' + count);
});

setTimeout(function(){
           console.log('2초후에 실행됨');
            process.emit('tick', '2');
},2000);

//////////////////////////////////////////////////////
var EventEmitter = require('events').EventEmitter;
var util = require('util');      //util : 프로토타입 객체를 쉽게 상속하도록 만들어줌

var calc = function(){
  this.on('stop', function(){   //stop이라는 이벤트가 발생했을때 함수를 실행하자
     console.log('calc에 stop이벤트 전달됨') ;
  });
};

util.inherits(calc, EventEmitter);  //EventEmitter을 상속

//calc를 프로토타입 객체로 만듬
calc.prototype.add = function(a, b){
    return a + b;
};

module.exports = calc;  //calc 프로토타입 할당


//3. 파일 다루기
var fs = require('fs');
var data = fs.readFileSync('./nodejs-mongoDB/package.json', 'utf-8');
console.log(data);
/*파일 내용을 그대로 읽어줌
{
  "name": "hyerii",
  "version": "1.0.0",
  "description": "",
  "main": "calc.js",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "errorhandler": "^1.5.1",
    "express": "^4.17.1",
    "express-error-handler": "^1.1.0",
    "express-session": "^1.17.1",
    "http": "0.0.1-security",
    "mongodb": "^3.6.2",
    "mongoose": "^5.10.11",
    "nconf": "^0.10.0",
    "path": "^0.12.7",
    "serve-static": "^1.14.1"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
*/

//비동기 방식
fs.readFile('./nodejs-mongoDB/package.json', 'utf-8', function(err, data){       
    console.log(data);
    //결과는 같지만 파일을 읽을 때까지 기다리지 않고 다른 코드 실행할수 있음 : 이게 비동기 방식
});  


/*fs.writeFile('./nodejs-mongoDB/output.txt', 'HYERII', function(err){        
    if(err){        //에러 발생한다면 확인
        console.log('에러 발생 : ' + err);
        console.dir(err);
        return;
    }
    console.log('output.txt 파일에 데이터 쓰기 완료'); 
});*/

//파일을 직접 열고 쓰고난 후 닫기

fs.open('./nodejs-mongoDB/output.txt', 'w', function(err, fd){      //'w' : 쓰기, 'r' : 읽기
    if(err){
        console.log('파일 오픈 시 에러 발생함');
        return;
    }
    var buf = new Buffer('출근 시르당\n');
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer){      //0 : 초기값, buf.length : 전체 출력한다.
        if(err){
            console.log('파일 쓰기 시 에러 발생');
            return;
        }
        console.log('파일쓰기 완료');
        fs.close(fd, function(){
            console.log('파일 닫기 완료함.');
        });
    });
});       


//Buffer()
var output = '조하느리';
var buffer1 =new Buffer(20);    //길이가 20인 buffer객체 생성
var len = buffer1.write(output, 'utf8'); //write 리턴값은 길이
console.log('버퍼에 쓰인 문자열의 길이 : ' +len);  //12
console.log('첫번째 버퍼에 쓰인 문자열 : ' + buffer1.toString());

console.log('버퍼객체인지 아닌지 여부 확인 : ' + Buffer.isBuffer(buffer1));  //true

var bytelen = Buffer.byteLength(buffer1);
console.log('bytelen : ' +bytelen);     //20

var str1 = buffer1.toString('utf-8', 0, 5);
console.log('str1 : ' +str1);


//Stream
var infile = fs.createReadStream('./output.txt', {flags:'r'});  //flags : 'r' - 읽기 권한 부여
infile.on('data', function(data){
    console.log('읽어들인 데이터 : ' + data);
});
infile.on('end', function(){
    console.log('읽기 종료');
})
//4. 로그 파일 남기기
