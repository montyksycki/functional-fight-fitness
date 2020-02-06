const express = require('express')
const router = express.Router()

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

module.exports = router