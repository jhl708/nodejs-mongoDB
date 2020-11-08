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
//4. 로그 파일 남기기
