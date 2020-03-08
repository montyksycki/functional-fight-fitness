require('dotenv').config()

const express = require('express')
const app = express()

// OTHER MISC CONFIG
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// VIEWS + LAYOUTS CONFIG
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// ROUTES CONFIG
const staticPageRouter = require('./routes/staticPages')
const memberRouter = require('./routes/members')
const programRouter = require('./routes/programs')
const scheduleRouter = require('./routes/schedules')
app.use('/', staticPageRouter)
app.use('/members', memberRouter)
app.use('/programs', programRouter)
app.use('/schedules', scheduleRouter)

// DATABASE CONFIG
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
																						 useUnifiedTopology: true,
																						 useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('+++ Connected to Mongoose +++'))

app.locals.someVar = "Hey Monty!!!"

// app.locals.getRadioInputs = () => {
// 	console.log("stuff")
// 	const radio_inputs = document.getElementsByClassName('radio-input')
// 	console.log( radio_inputs )
// }

app.listen(process.env.PORT, console.log(`+++ Server Started on PORT: ${process.env.PORT} +++`))












