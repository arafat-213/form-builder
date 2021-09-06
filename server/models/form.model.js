const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
	formName: {
		type: String,
		required: true
	},
	questions: {
		type: Array,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

module.exports = Form = mongoose.model('form', formSchema)
