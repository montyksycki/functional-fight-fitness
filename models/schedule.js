const mongoose = require('mongoose')
const scheduleSchema = new mongoose.Schema({

	date: {
		type: Date,
		required: true
	},
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Member'
	},
	program: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Program'
	}

})

const Schedule = mongoose.model('Schedule', scheduleSchema)
module.exports = Schedule