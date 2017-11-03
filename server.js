	var express = require('express');           // Used to easily direct requests 
	var mongoose = require('mongoose');           // Javascript interface to mongodb
	var bodyParser = require('body-parser');    // Parses post request data for us
	var app = express();
	var port = process.env.PORT || 5000;

	// Create mongo connection
	var mongoURI = "mongodb://localhost/Tetri-X";
	mongoose.connect(mongoURI , {
		useMongoClient : true
	});
	mongoose.Promise = global.Promise;


	// Tell the app to parse the body of incoming requests
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());

	// app.get("/", function(req, res) {
	// 	res.send("anything");
	// });

	// // This will be called when a user submits a new score
	// app.post("/submitScore", function(req, res)
	// {
	// 	console.log("Submit Score Called");
	// 	res.send("What's up");
	// });

	// // This will be called when a user requests a list of scores
	// app.post("/highScores", function(req, res)
	// {
	// 	console.log("Highscores Called");
	// 	res.send("What's up");
	// });

	// Start the server
	var server = app.listen(port, function()
	{ 
		console.log('Listening on port %d', server.address().port);
	});