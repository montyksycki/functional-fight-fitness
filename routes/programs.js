const express = require('express')
const router = express.Router()
const Program = require('../models/program')

const attributes = [ "training_program_type", "level", "gender_age", "training_program_title", "description" ]

// PROGRAMS - ALL
router.get('/', getRadioInputs, async (req, res) => {
	try {
		const programs = await Program.find().sort({ createdAt: 'Descending' })
		res.render('programs/index', { programs })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// PROGRAMS - NEW
router.get('/new', (req, res) => {
	res.render('programs/new')
})

// PROGRAMS - CREATE
router.post('/', async (req, res) => {
	const createObject = {}
	attributes.forEach(attribute => {
		createObject[attribute] = req.body[attribute]
	})
	try {
		const program = new Program(createObject)
		const newProgram = await program.save()
		res.redirect('programs')
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
})

// PROGRAMS - SHOW
router.get('/:id', getProgram, async (req, res) => {
	try {
		const showProgram = await res.program
		res.render('programs/show', { showProgram })
	} catch (err) {
		res.json({ message: err.message })
	}
})

// PROGRAMS - EDIT
router.get('/:id/edit', getProgram, async (req, res) => {
	try {
		const editProgram = await res.program
		res.render('programs/edit', { editProgram } )
	} catch {
		res.redirect('/programs')
	}
})

// PROGRAMS - UPDATE
router.put('/:id', getProgram, async (req, res) => {
	attributes.forEach( attribute => {
		if ( req.body[attribute] != null ) {
			res.program[attribute] = req.body[attribute]
		}
	})
	try {
		const updateProgram = await res.program.save()
		res.redirect('/programs')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// PROGRAMS - DELETE
router.delete('/:id', getProgram, async (req, res) => {
	try {
		await res.program.remove()
		res.redirect('/programs')
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

async function getProgram(req, res, next) {
	let program
	try {
		program = await Program.findById(req.params.id)
		if ( program == null ) {
			return res.status(404).json({ message: "Can't find program." })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.program = program
	next()
}

function getRadioInputs(req, res, next) {
	// const radioInputs = document.getElementsByClassName('radio-inputs')
	console.log('radioInputs')
	next()
}

module.exports = router


