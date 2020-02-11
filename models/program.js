const mongoose = require('mongoose')
const programSchema = new mongoose.Schema({

	training_program_type: {
		type: String,
		required: true,
		enum: ["Jiu-Jitsu - Gi", "Jiu-Jitsu - NoGi", "Muay Thai Kick Boxing", "MMA", "Fitness", "All"]
	},
	level: {
		type: String,
		required: true,
		enum: ["Beginner", "Intermediate", "Advanced", "All"]
	},
	gender_age: {
		type: String,
		required: true,
		enum: ["Women", "Children", "Adult"]
	},
	training_program_title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}

})

const Program = mongoose.model('Program', programSchema)
module.exports = Program