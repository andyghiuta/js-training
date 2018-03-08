const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
// const util = require('util');
// Convert fs.readFile && fs.writeFile into Promise version of same
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);

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

// POST "data" route handler
app.post('/data', function(req, res) {
  // read "db" file
  fs.readFile(dbPath, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send('Couldn\'t read DB!');
    }
    let json = JSON.parse(data);
    // add the shape
    json.push(req.body);
    fs.writeFile(dbPath, JSON.stringify(json, null, 2), 'utf8', function (err) {
      if (err) {
        res.status(500).send('Couldn\'t write DB!');
      }
      res.json({
        status: 'ok'
      });
    });
  });
});

// async POST
/*let readData = async function() {
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
}

// POST "data" route handler
app.post('/data', function(req, res) {
  saveShape(req.body)
    .then(() => {
      res.json({
        status: 'ok'
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Couldn\'t write to DB!');
    });
});*/

app.listen(3000, () => console.log('Example app listening on port 3000!'));
