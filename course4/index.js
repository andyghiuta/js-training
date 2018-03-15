const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, 'data', 'db.json');
const dbPathSave = path.join(__dirname, 'data', 'dbSave.json');
app.use(express.static(path.join(__dirname, 'public')));

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
	return function (err,   data) {
		if (err) {
			res.status(500).send('Couldn\'t read DB!');
		}
		let json = JSON.parse(data);
	
		// add the shape
		json.push(req.body);
		fs.writeFile(dbPathSave, JSON.stringify(json, null, 2), 'utf8', doneWrite(req, res));
	}
};

// POST "data" route handler
app.post('/data', function(req, res) {
	// read "db" file
	fs.readFile(dbPath, 'utf8', doneRead(req, res));
});



/*let writeShapes = function(data){
	fs.writeFile(dbPathSave, JSON.stringify(data, null, 4), (err) => {
		if (err) {
			console.error(err);
			return;
		};
		console.log("File has been created");
	});
}


writeShapes({"ceva":"ceva"});*/

app.listen(3000, () => console.log('Example app listening on port 3000!'));
