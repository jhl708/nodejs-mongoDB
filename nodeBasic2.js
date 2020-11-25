<<<<<<< HEAD
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
=======
//배열 만들기
var alp = ['a', 'b', 'c'];

//배열안에 객체 넣기
var users = [{name : 'a', age : 1}, {name : 'b', age : 2}];

//배열안에 객체 추가하기
users.push({name : 'c', age : 3});

console.log('alp count : ' + alp.length);
console.log('users 첫번째 객체의 name : ' + users[0].name);

//배열 안에 함수 객체 넣기
var animals = [{name : 'dog', life : 15}, {name : 'cat', life : 16}, {name :'duck', life : 10}];

var oper = function(a,b){
    return a+b;
};
//함수 객체 추가
animals.push(oper);
console.dir(animals);
/*
[
  { name: 'dog', life: 15 },
  { name: 'cat', life: 16 },
  [Function: oper]
]
*/
console.log('세번째 배열 요소를 함수로 실행한다. : ' + animals[3](15,16));

for(var i= 0; i <animals.length; i++){
    console.log('배열 원소 '+ i + ' : ' + animals[i].name);
}
/*배열 원소 0 : dog
배열 원소 1 : cat
배열 원소 2 : duck
배열 원소 3 : oper*/

//권장하는 코드 => 되도록이면 foreach 쓰자
animals.forEach(function(item, index){
    console.log('배열 원소 ' + index + ' : ' + item.name);
    
});

/* 위 for문이랑 값 동일
배열 원소 0 : dog
배열 원소 1 : cat
배열 원소 2 : duck
배열 원소 3 : oper*/



//******콜백 함수(중요!1!!)
/*
변수에 함수를 할당할 수 있으므로 함수를 호출할 때 파라미터로 다른 함수 전달 가능
*/
//기본적인 의미
/*
function add(a,b,callback){ //1. 콜백함수를 파라미터로 전달
    var result = a+ b;  
    callback(result);   //2. 콜백함수로 결과값을 전달한다.
}
*/

// 1. 기본적인 콜백함수
function add(a, b, callback){
    var result = a + b;
    callback(result);       // 1
}

add(10, 10, function(result){
    console.log('콜백함수 실행 : ' + result);     //1 에서 실행
})


//2. 응용 콜백함수
function multiple(a, b, callback){
    var result = a * b;
    callback(result);
    
    var history = function(){
    
        return a + ' * ' + b + ' = ' + result;
    }
    return history;
}

var multiple_history = multiple(10, 50, function(result){
    console.log('곱하기 결과 : ' + result);
});

console.log('multiple_history의 자료형 : ' + typeof(multiple_history));     //function

console.log('결과값으로 받은 함수 실행 : ' + multiple_history());  //10 * 50 = 500




/********프로토타입***********/
//프로토타입  : 객체의 원형을 프로토타입이라 하고 이 프로토타입이 클래스의 역할을 한다.
//프로토타입을 만들고 new 연산자를 이용해 새로운 객체를 만들어 낼 수 있다.

/*
var person1 = {name : 'aaa', age : 20};
var person2 = {name : 'bbb', age : 20};
*/

function Person(name, age){
    this.name = name;
    this.age = age;
}

//Person을 프로토타입 객체로 본다
Person.prototype.walk = function(speed){
    console.log(speed + 'km 속도로 걸어간다.');
}

var person3 = new Person('ccc', 30);
person3.walk(50);
>>>>>>> d75e16770a485c59ecbf5c69f8f5824603dc6d6c
