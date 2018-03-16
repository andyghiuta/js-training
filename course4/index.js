const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const dbPath = path.join(__dirname, 'data', 'db.json');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// GET "data" route handler
app.get('/data', function (req, res) {
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
app.post('/savedata', function(req, res) {
	// read "db" file
	fs.readFile(dbPath, 'utf8', doneRead(req, res));
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));
