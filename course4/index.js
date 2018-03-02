const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, 'data', 'db.json');
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, () => console.log('Example app listening on port 3000!'));
