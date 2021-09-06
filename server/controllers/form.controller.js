const Form = require('../models/form.model')
const { validationResult } = require('express-validator')

module.exports = {
	createForm: async (req, res) => {
		try {
			// Validation
			const errors = validationResult(req)
			if (!errors.isEmpty())
				return res
					.status(400)
					.json({ error: errors.array().map(error => error.msg)[0] })

			const { formName, questions } = req.body
			let form = new Form({ formName, questions })

			// Save the form in db
			await form.save()
			// Send the created form back in response
			return res.status(201).json({ form })
		} catch (error) {
			console.log(error)
			res.status(500).json({
				error: 'Something went wrong. Please try again later'
			})
		}
	},

	getForms: async (req, res) => {
		try {
			const forms = await Form.find()
			if (!forms)
				return res.status(404).json({
					error: 'No forms available at the moment.'
				})
			// Send list of forms available in response
			return res.status(200).json({ forms })
		} catch (error) {
			console.log(error)
			res.status(500).json({
				error: 'Something went wrong. Please try again later'
			})
		}
	}
}
