// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

var ScoreSchemaMulti = new Schema({
	score: {
		type: Number
	},
	highScore: {
		type: Boolean,
		default: false
	},
	scoreDate: {
		type: Date,
		default: Date.now
	},
	result: {
		type: String,
	}
});

var Score = mongoose.model("Score", ScoreSchemaMulti);
module.exports = Score;






