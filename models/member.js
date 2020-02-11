const mongoose = require('mongoose')
const memberSchema = new mongoose.Schema({

	name_first: {
		type: String,
		required: true,
	},
	name_last: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	phone: {
		type: String,
		required: true,
	},
	program: {
		type: String,
		enum: ["Jiu-Jitsu", "Kick Boxing", "MMA", "Fitness", "All"],
		required: true,
		default: "Jiu-Jitsu"
	},
	rank: {
		type: String,
		enum: ["white", "blue", "purple", "brown", "black"],
		default: "white"
	},
	staff: {
		type: Boolean,
		default: false
	},
	instructor: {
		type: Boolean,
		default: false
	},
	admin: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}

})

const Member = mongoose.model('Member', memberSchema)
module.exports = Member

