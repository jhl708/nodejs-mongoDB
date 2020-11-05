//노드 전역변수 : __filnaeme, __dirname

//__filename : 파일 전체 경로 출력
console.log('현재 실행한 파일 이름 : %s', __filename);   //C:\nodejs\nodeBasic1.js

//__dirname : 폴더 전체 경로 출력
console.log('현재 실행한 파일 경로 : %s', __dirname);    //C:\nodejs

//process.argv : 프로세스 실행할때 전달되는 파라미터
console.log('argvs 속성의 파라미터 수 : ' + process.argv.length);
console.dir(process.argv);  //[ 'C:\\Program Files\\nodejs\\node.exe', 'C:\\nodejs\\nodeBasic1.js' ]

//process.env : OS환경변수 정보
console.dir(process.env);
console.log('OS 환경변수 값 : ' + process.env['OS']);    //OS 환경변수 값 : Windows_NT 
console.log(process.env.node_env);

//exports VS module.exports
//1. exports 함수 호출하는 방법
var calc = require('./calc');
console.log('모듈로 분리한 후 - calc.add 함수 호출 결과 : %d', calc.add(26,26));

//2. module.exports 함수 호출 방법
var calc2 = require('./calc2');
console.log('모듈로 분리한 후 - calc2.minus 함수 호출 결과 : %d', calc2.minus(52,26));


//npm install nconf --save
var nconf = require('nconf');
nconf.env();
var value = nconf.get('OS');    // OS 환경변수의 값
console.log('value : ' + value);

/*npm init : package.json 파일이 만들어지는데 다른PC에서 실행할 때 
npm install이라고 쓰면 전 PC에서 설치했던 파일 한꺼번에 설치됨 
회사에서 유용*/