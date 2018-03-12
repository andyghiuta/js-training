const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, 'data', 'db.json');
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

let readData = function(req, response){
	return (err, data) => {
		let json = JSON.parse(data);
		if(err){
			throw res.status(500).send('Could not write db');
		}else{
			json.push(response.body())
		}
	}
}

let writeShapes = function(data){
	fs.writeFile("./data/db.json", JSON.stringify(data), (err) => {
		if (err) {
			console.error(err);
			return;
		};
		console.log("File has been created");
	});
}

//writeShapes({'ceva':'ceva'})
readData(dbPath)
app.listen(3000, () => console.log('Example app listening on port 3000!'));
