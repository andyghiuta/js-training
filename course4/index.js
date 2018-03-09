const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const util = require('util');
// Convert fs.readFile && fs.writeFile into Promise version of same
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const dbPath = path.join(__dirname, 'data', 'db.json');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json

// GET "data" route handler
app.get('/data', function(req, res) {
  // read "db" file
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send('Couldn\'t read DB!');
    }
    res.json(JSON.parse(data));
  });
});


let doneWrite = function(req, res) {
  return function (err) {
    if (err) {
      res.status(500).send('Couldn\'t write DB!');
    }
    res.json({
      status: 'ok'
    });
  };
};

let doneRead = function(req, res) {
  return function (err, data) {
    if (err) {
      res.status(500).send('Couldn\'t read DB!');
    }
    let json = JSON.parse(data);
    // add the shape
    json.push(req.body);
    fs.writeFile(dbPath, JSON.stringify(json, null, 2), 'utf8', doneWrite(req, res));
  }
};

// POST "data" route handler
app.post('/data', function(req, res) {
  // read "db" file
  fs.readFile(dbPath, 'utf8', doneRead(req, res));
});

// async POST
let readData = async function() {
  let data = await readFile(dbPath, 'utf8');
  return JSON.parse(data);
};
let writeData = async function(data) {
  await writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

let saveShape = async function(shape) {
  let data = await readData();
  // add the shape
  data.push(shape);
  await writeData(data);
  return true;
};

// // POST "data" route handler
app.post('/data', function(req, res) {
  (async function () {
    try {
      await saveShape(req.body);
      res.json({
        status: 'ok'
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Couldn\'t write to DB!');
    } finally {
      // everytime
    }
  })();
  // saveShape(req.body)
  //   .then(() => {
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).send('Couldn\'t write to DB!');
  //   }).
    // finally(() => {

    // });
  console.log('11');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
