const Queue = require("queue-fifo");

const callbackQueue = new Queue();
const microtaskQueue = new Queue();

const callStack = [];

for (let i = 0; i < 5; i++) {
  callStack.push(i);
}

callbackQueue.enqueue("console.log()");
callbackQueue.enqueue("DOM API");
callbackQueue.enqueue("setTimeOut");

microtaskQueue.enqueue("promise");
microtaskQueue.enqueue("Mutation in DOM");

function jsEngine() {
  if (callStack.length > 0) {
    console.log("Executed Successfully: ", callStack[callStack.length - 1]);
    callStack.pop();
  } else {
    console.log("CALLSTACK IS EMPTY");
  }
}

function eventLoop() {
  if (callStack.length == 0) {
    if (microtaskQueue.isEmpty()) {
      if (callbackQueue.isEmpty()) {
        console.log("Js Engine is in Ideal State");
      } else {
        let callbackTask = callbackQueue.peek();
        callStack.push(callbackTask);
        callbackQueue.dequeue();
        console.log(
          `${callbackTask} is assigned to callStack from callback Queue for execution`
        );
      }
    } else {
      let microtask = microtaskQueue.peek();
      callStack.push(microtask);
      microtaskQueue.dequeue();
      console.log(
        `${microtask} is assigned to callStack from microTask Queue for execution`
      );
    }
  } else {
    console.log("Thread is executing global execution context");
  }
}

setInterval(jsEngine, 2000);
setInterval(eventLoop, 1000);
