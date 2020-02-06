require('dotenv').config()

const express = require('express')
const app = express()

// VIEWS + LAYOUTS CONFIG
const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// ROUTES CONFIG
const staticPagesRouter = require('./routes/staticPages')
app.use('/', staticPagesRouter)

// DATABASE CONFIG

app.listen(process.env.PORT, console.log(`+++ Server Started on PORT: ${process.env.PORT} +++`))