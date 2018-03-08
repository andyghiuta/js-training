let logElem = document.getElementById('log');
function log(msg) {
  logElem.innerHTML = logElem.innerHTML + `${(new Date()).toISOString()}: ${msg} <br/>`;
}
function toggleProgress(show) {
  log('Progress will be ' + (show ? 'shown' : 'hidden'));
  document.getElementById('loading').classList.toggle('d-none', !show);
}

// MemoryManagement: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management

// Event Queue
const s = new Date().getSeconds();

setTimeout(function() {
  // prints out "2", meaning that the callback is not called immediately after 500 milliseconds.
  log('Ran after ' + (new Date().getSeconds() - s) + ' seconds');
}, 500);

while(true) {
  if (new Date().getSeconds() - s >= 2) {
    log('Good, looped for 2 seconds');
    break;
  }
}

// "Zero delays"
(function() {

  log('this is the start');

  setTimeout(function cb() {
    log('this is a msg from call back');
  });

  log('this is just a message');

  setTimeout(function cb1() {
    log('this is a msg from call back1');
  }, 0);

  log('this is the end');

})();


// start Callback logic
let simulateTimeout;
function retrieveResult(callback) {
  log('retrieveResult');
  clearTimeout(simulateTimeout);
  // simulate an http call
  simulateTimeout = setTimeout(function() {
    log('build the result');
    let myResult = 'Success!';
    callback(myResult);
  }, 5 * 1000);
};

let showResult = function(callMeWhenDone) {
  toggleProgress(true);
  let doneCallback = function(result) {
    log('We got a result = ', result);
    toggleProgress(false);
    callMeWhenDone();
  };
  log('before retrieveResult');
  retrieveResult(doneCallback);
  log('after retrieveResult');
}

let callMeWhenDone = function() {
  log('THE END');
}

log('START');

log('before showResult');
// 'callMeWhenDone' is a callback
showResult(callMeWhenDone);
log('after showResult');

// start Promise logic
let simulateTimeoutPromise;
let retrieveResultPromise = new Promise(function(resolve, reject) {
  log('retrieveResult');
  clearTimeout(simulateTimeoutPromise);
  // simulate an http call
  simulateTimeoutPromise = setTimeout(function() {
    log('build the result');
    let myResult = 'Success!';
    resolve(myResult);
  }, 5 * 1000);
});

let showResultWithPromise = function(callMeWhenDone) {
  toggleProgress(true);
  let doneCallback = function(result) {
    log('We got a result = ', result);
    toggleProgress(false);
    callMeWhenDone();
  };
  log('before retrieveResult');
  retrieveResultPromise
    .then(doneCallback)
    .catch();
  log('after retrieveResult');
}

log('START');

log('before showResult');
// 'callMeWhenDone' is a callback
showResultWithPromise(callMeWhenDone);
log('after showResult');
