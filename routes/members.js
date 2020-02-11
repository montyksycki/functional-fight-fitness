const express = require('express')
const router = express.Router()
const Member = require('../models/member')

// MEMBERS - ALL
router.get('/', async (req, res) => {
	try {
		const members = await Member.find().sort({ createdAt: 'descending' })
		// res.render('members/index', { members, title: 'All Active Members' })
		res.render('members/index', { members })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// MEMBER - NEW
router.get('/new', (req, res) => {
	res.render('members/new')
})

// MEMBER - CREATE
router.post('/', async (req, res) => {
	// const attributes = [ 'name_first', 'name_last', 'email', 'phone', 'staff', 'instructor', 'admin', 'program', 'rank' ]
	const member = new Member({
		// attributes.forEach(attribute => {
		// 	member[attribute] = req.body[attribute]
		// })
		name_first: req.body.name_first,
		name_last: req.body.name_last,
		email: req.body.email,
		phone: req.body.phone,
		program: req.body.program,
		rank: req.body.rank,
		staff: req.body.staff,
		instructor: req.body.instructor,
		admin: req.body.admin
	})

	try {
		const newMember = await member.save()
		res.redirect('members')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// if ( req.body[attribute] != null ) {
// 	res.member[attribute] = req.body[attribute] 
// }

// MEMBER - SHOW
router.get('/:id', getMember, async (req, res) => {
	try {
		const showMember = await res.member
		res.render('members/show', {showMember})
	} catch (err) {
		res.json({ message: err.message })
	}
})

// MEMBER - EDIT
router.get('/:id/edit', getMember, async (req, res) => {
	try {
		const editMember = await res.member
		res.render('members/edit', { editMember })
	} catch {
		res.redirect('/members')
	}
})


// MEMBER - UPDATE
router.put('/:id', getMember, async (req, res) => {
	const attributes = [ 'name_first',
											 'name_last',
											 'email',
											 'phone',
											 'program',
											 'rank',
											 'staff',
											 'instructor',
											 'admin' ]
	attributes.forEach( attribute => {
		if ( req.body[attribute] != null ) {
			res.member[attribute] = req.body[attribute]
		}
	})
	try {
		const updatedMember = await res.member.save()
		res.redirect('/members')
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})


// MEMBER - DELETE
router.delete('/:id', getMember, async (req, res) => {
	try {
		await res.member.remove()
		res.redirect('/members')
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})


async function getMember(req, res, next) {
	let member
	try {
		member = await Member.findById(req.params.id)
		if ( member == null ) {
			return res.status(404).json({ message: 'Cannot find member' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.member = member
	next()
}

module.exports = router