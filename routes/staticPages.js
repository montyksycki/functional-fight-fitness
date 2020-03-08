const express = require('express')
const router = express.Router()
const Member = require('../models/member')

router.get('/', (req, res) => {
	res.render('./staticPages/index')
})

router.get('/about', (req, res) => {
	res.render('./staticPages/about')
})

router.get('/info', (req, res) => {
	res.render('./staticPages/info')
})

router.get('/contact', (req, res) => {
	res.render('./staticPages/contact')
})

router.get('/bjj_team', async (req, res) => {
	const belts_blue = await Member.find({ rank: 'blue' })
	const belts_purple = await Member.find({ rank: 'purple' })
	const belts_brown = await Member.find({ rank: 'brown' })
	const belts_black = await Member.find({ rank: 'black' })
	res.render('./staticPages/bjj_team', { belts_black, belts_brown, belts_purple, belts_blue })
})

module.exports = router


// [ belts_black, belts_brown, belts_purple, belts_blue ]