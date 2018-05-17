'use strict';

function Queue(userName) {
  this.userName = userName;
  this.first = null;
  this.last = null;
  this.length = 0;
  this.timeout = 0;
}

Queue.prototype.setTimeout = function(msec) {
  this.timeout = msec;
  return this;
};

const prioritization = function(queue, element) {
  let current = queue.last;
  for (let i = 1; i < queue.length; i++) {
    if (current.priority <= element.priority) current = current.prev;
  }
  if (!current.prev && current.priority < element.priority) {
    element.next = queue.first;
    queue.first.prev = element;
    queue.first = element;
  } else if (current.priority >= element.priority) {
    element.next = current.next;
    current.next = element;
    element.prev = current;
    if (!element.next) queue.last = element;
  }
}

Queue.prototype.add = function(item, priority) {
  const element = { prev: null, next: null, item, priority };
  if (!this.last) {
    this.first = element;
    this.last = element;
  } else {
    prioritization(this, element);
  }
  this.length++;
  if (this.timeout) {
    setTimeout(() => {
      if (this.length > 1) {
        this.last = this.last.prev;
        this.last.next = null;
        this.length--;
      } else {
        this.first = null;
        this.last = null;
        this.length = 0;
      }
    }, this.timeout);
  }
  return this;
};

Queue.prototype.shift = function() {
  const element = this.first;
  if (!element) return null;
  if (this.last === element) {
    this.first = null;
    this.last = null;
  } else {
    this.first = element.next;
    this.first.prev = null;
  }
  this.length--;
  return element.item;
};

Queue.prototype.drain = function() {
  this.first = null;
  this.last = null;
  this.length = 0;
  this.timeout = 0;
};

function QueuingSystem() {
  this.queues = [];
}

QueuingSystem.prototype.logIn = function(userName) {
  const queues = this.queues;
  for (let i = 0; i < queues.length; i++) {
    if (queues[i].userName === userName) return null;
  }
  const list = new Queue(userName);
  queues.push(list);
  return list;
};

QueuingSystem.prototype.logOff = function(userName) {
  const queues = this.queues;
  for (let i = 0; i < queues.length; i++) {
    if (queues[i].userName === userName) {
      queues.splice(i, 1);
      return;
    }
  }
};

QueuingSystem.prototype.process = function(callback) {
  this.queues.forEach(item => callback(item));
};

module.exports = QueuingSystem;
