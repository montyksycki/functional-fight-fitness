const express = require('express')
const router = express.Router()
const Schedule = require('../models/schedule')
const Member = require('../models/member')
const Program = require('../models/program')


// SCHEDULES - NEW
router.get('/new', async (req, res) => {
	try {
		const instructors = await Member.find({ instructor: true })
		const programs = await Program.find({})
		// console.log(instructors)
		res.render('schedules/new', { instructors, programs })
	} catch {

	}
})

// SCHEDULE - CREATE
router.post('/', (req, res) => {
	res.render('')
})

// SCHEDULES - SHOW
router.get('/:id', (req, res) => {
	res.render('schedules/show')
})

// SCHEDULES - ALL
router.get('/', (req, res) => {
	res.render('schedules/index')
})

// SCHEDULES - EDIT
router.get('/:id/edit', (req, res) => {
	res.render('schedules/edit')
})

// SCHEDULES - UPDATE
router.put('/new', (req, res) => {
	res.render('schedules/new')
})

// SCHEDULES - DELETE
router.delete('/:id', (req, res) => {
	res.render('schedules/new')
})

module.exports = router