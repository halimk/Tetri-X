// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
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
	}
});

var Score = mongoose.model("Score", ScoreSchema);
module.exports = Score;







