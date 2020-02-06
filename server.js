require('dotenv').config()

const express = require('express')
const app = express()

// OTHER MISC CONFIG
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
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
const staticPagesRouter = require('./routes/staticPages')
app.use('/', staticPagesRouter)

// DATABASE CONFIG
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
																						 useUnifiedTopology: true,
																						 useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('+++ Connected to Mongoose +++'))

app.listen(process.env.PORT, console.log(`+++ Server Started on PORT: ${process.env.PORT} +++`))





