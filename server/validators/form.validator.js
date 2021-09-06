const { check } = require('express-validator')

exports.formValidator = [
	check('formName', 'Name is required').notEmpty(),
	check('questions', 'At least one question is required').notEmpty()
]
