const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const formRouter = require('./routes/form.route')

require('dotenv').config({
	path: './config/config.env'
})

const app = express()

// cors config for dev env
if (process.env.NODE_ENV === 'development')
	app.use(cors({ origin: process.env.CLIENT_URL }))

// use body parser
app.use(bodyParser.json())

// connect the database
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true
		})
		console.log('DB connected')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

connectDB()

// use form routes
app.use('/api/form', formRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log('Server started on port ', PORT)
})
