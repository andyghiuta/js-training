let logElem = document.getElementById('log');
function log(msg) {
  logElem.innerHTML = logElem.innerHTML + `${(new Date()).toISOString()}: ${msg} <br/>`;
}
function toggleProgress(show) {
  log('Progress will be ' + (show ? 'shown' : 'hidden'));
  document.getElementById('loading').classList.toggle('d-none', !show);
}

// MemoryManagement: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management


function memoryExample() {
  var createdElements = {};
  var events = [];
  function destroyMyMemory() {
    var i, el;


    function attachAlert(element) {
      element.onclick = function() {
        alert(element.innerHTML);
      };
    }

    function reallyBadAttachAlert(element) {
      return function() {
        alert(element.innerHTML);
      };
    }

    for (i = 0; i < 100; i++) {
      el = document.createElement('div');
      el.innerHTML = i;

      /** posibility one: you're storing the element somewhere **/
      attachAlert(el);
      createdElements['div' + i] = el;

      /** posibility two: you're storing the callbacks somewhere **/
      event = reallyBadAttachAlert(el);
      events.push(event);
      el.onclick = event;
    }
    log('Memory destroyed');
  }
  // destroyMyMemory();
  setInterval(destroyMyMemory, 5 * 1000);
}

function queueExample() {
  // Event Queue
  const s = new Date().getSeconds();
  log('START');

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

    log('1. this is the start');

    setTimeout(function cb() {
      log('2. this is a msg from call back');
    });

    log('3. this is just a message');

    setTimeout(function cb1() {
      log('4. this is a msg from call back1');
    }, 0);

    log('5. this is the end');

  })();
}

function callbackExample() {
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
      log('We got a result = ' + result);
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

  log('before showResult');
  // 'callMeWhenDone' is a callback
  showResult(callMeWhenDone);
  log('after showResult');
}

function promiseExample() {
  // start Promise logic
  let simulateTimeoutPromise;
  let promiseCallback = function(resolve, reject) {
    log('retrieveResult');
    clearTimeout(simulateTimeoutPromise);
    // simulate an http call
    simulateTimeoutPromise = setTimeout(function() {
      log('build the result');
      let myResult = true;
      resolve(myResult);
      // reject('Some message');
    }, 5 * 1000);
  };
  // Promise is an object which receives a callback with 2 callbacks
  let retrieveResultPromise = new Promise(promiseCallback);


  let parseResult = function(result) {
    let simulateTimeoutPromiseParse;
    let promiseCallbackParse = function(resolve, reject) {
      log('parseResult');
      clearTimeout(simulateTimeoutPromiseParse);
      // simulate an http call
      simulateTimeoutPromiseParse = setTimeout(function() {
        log('parse the result');
        resolve(result ? 'Success!' : 'Fail..');
      }, 5 * 1000);
    };
    return new Promise(promiseCallbackParse);
  }

  let showResultWithPromise = async function(callMeWhenDone) {
    toggleProgress(true);
    let doneCallback = function(result) {
      log('We got a result = ' + result);
      toggleProgress(false);
      callMeWhenDone();
    };
    log('before retrieveResult');
    // retrieveResultPromise
    //   .then(parseResult)
    //   .then(doneCallback)
    //   .catch(function(error) {

    //   });
    let result1 = await parseResult(await retrieveResultPromise);
    log('after retrieveResult');
  }

  let callMeWhenDoneP = function() {
    log('THE END');
  }
  log('before showResult');
  // 'callMeWhenDone' is a callback
  showResultWithPromise().then(callMeWhenDoneP);
  log('after showResult');
}

// memoryExample();
// queueExample();
// callbackExample();
promiseExample();
