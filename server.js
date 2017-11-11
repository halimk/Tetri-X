	var express = require('express');           // Used to easily direct requests 
	var mongoose = require('mongoose');           // Javascript interface to mongodb
	var bodyParser = require('body-parser');    // Parses post request data for us
	var app = express();
	var port = process.env.PORT || 5000;
    var Score = require("./scoreSchema");

	// Create mongo connection
	var mongoURI = "mongodb://localhost/Tetri-X";
	mongoose.connect(mongoURI , {
		useMongoClient : true
	});
	mongoose.Promise = global.Promise;

    var db = mongoose.connection;

    db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
    });

    db.once("open", function() {
     console.log("Mongoose connection successful.");
    });

	// Tell the app to parse the body of incoming requests
	// Run Morgan for Logging
// app.use(logger(“dev”));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Enable CORS so that browsers don’t block requests.
    app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});


	app.get("/", function(req, res) {
		res.send("anything");
	});

	// This will be called when a user submits a new score
	app.post("/submitScore", function(req, res){
     var newScore = new Score(req.body);
        console.log(req.body);
        newScore.save(function(err, doc){
            if (err) {
                console.log("post error", err);
            }
            else {
                console.log("Submit Score Called");

                res.send(doc);
            }
          });
	});

    app.post("/wins", function(req, res){
     var newWins = new Wins(req.body);
        console.log(req.body);
        db.collection.count()
        newWins.save(function(err, doc){
            if (err) {
                console.log("post error", err);
            }
            else {
                console.log("You win!");

                res.send(doc);
            }
          });
    });

    app.post("/loses", function(req, res){
     var newloses = new Loses(req.body);
        console.log(req.body);
        newloses.save(function(err, doc){
            if (err) {
                console.log("post error", err);
            }
            else {
                console.log("You lose!");

                res.send(doc);
            }
          });
    });

	// This will be called when a user requests a list of scores
	app.get("/highScores", function(req, res)
	{
        Score.find({})
        .sort({score: -1})
        .limit(3)
        .then(function(results){
            console.log("Highscores Called");
            res.send(results);
        })
	});

    app.get("/getWins", function(req, res)
    {
        Score.find({})
        .sort({score: -1})
        .limit(3)
        .then(function(results){
    app.post("/wins", function(req, res){
     var newWins = new Wins(req.body);
        console.log(req.body);
        db.collection.count()
        newWins.save(function(err, doc){
            if (err) {
                console.log("post error", err);
            }
            else {
                console.log("You win!");

                res.send(doc);
            }
          });
    });
            console.log("win");
            res.send(results);
        })
    });

    app.get("/getLoses", function(req, res)
    {
        Score.find({})
        .sort({score: -1})
        .limit(3)
        .then(function(results){
            console.log("lose");
            res.send(results);
        })
    });

	// Start the server
	var server = app.listen(port, function()
	{ 
		console.log('Listening on port %d', server.address().port);
	});


	