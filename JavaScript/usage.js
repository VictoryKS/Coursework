'use strict';

const QueuingSystem = require('./queuing-system.js');

const q = new QueuingSystem();

const User1 = q.logIn('John');
const User2 = q.logIn('Tom');
const User3 = q.logIn('John');

const obj1 = { number: 'first' };
const obj2 = { number: 'second' };
const obj3 = { number: 'third' };

User1.setTimeout(3000)
     .add(obj1, 7)
     .add(obj2, 9)
     .add(obj3, 3);

User2.add(obj1, 5);

q.process(item => {
  console.log(item.shift());
});

console.log('///////////////');

q.process(item => {
  console.log(item.shift());
});

q.logOff('Tom');
console.log('///////////////');

setTimeout(() => {
  q.process((item) => {
    console.log(item);
  });
}, 4000);
