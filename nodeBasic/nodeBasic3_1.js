var calc = require('./nodeBasic3');

var calc1 = new calc();
calc1.emit('stop');
          
console.log('calc에 stop 이벤트 전달함.'); //nodeBasic3.js의 calc로 전달