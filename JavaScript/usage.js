'use strict';

const QueuingSystem = require('./queuing-system.js');

const qsys = new QueuingSystem();

const user1 = qsys.logIn('John');
const user2 = qsys.logIn('Tom');
const user3 = qsys.logIn('John');

const obj1 = { number: 'first' };
const obj2 = { number: 'second' };
const obj3 = { number: 'third' };

user1.setTimeout(3000)
  .add(obj1, 7)
  .add(obj2, 9)
  .add(obj3, 3);

user2.add(obj1, 5);

qsys.process(item => {
  console.log(item.shift());
});

console.log('///////////////');

qsys.process(item => {
  console.log(item.shift());
});

qsys.logOff('Tom');
console.log('///////////////');

setTimeout(() => {
  qsys.process((item) => {
    console.log(item);
  });
}, 4000);
