var name;
console.log('name : ' + name);  //undefined

var age = 1;
console.log('age : ' + age);


//1. 자바스크립트의 객체는 {}로 만든다.
var person = {};
person['name'] = '하느리'; //name 속성 추가
person.age = 100; //age 속성 추가

console.log('이름 : ' + person.name);
console.log('나이 : ' + person.age);


//2. 자바스크립트는 함수를 변수에 할당할 수 있음.
//함수 이름이 add라는 뜻
var add = function(a,b){return a+b;}

console.log(add(11,11));


//3. person 객체 속성 안에 함수 할당
person.minus = function(a,b){
    return a-b;
};

console.log('minus : ' + person.minus(50,26));


//4. apple 객체 안에 함수 할당
var apple = {
    airpod : 'pro',
    iphone : '11',
    price  : function(a,b){
        return a+b;
    }
};

console.log('가격 : ' + apple.price(10,10));
