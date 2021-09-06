const express = require('express')
const { createForm, getForms } = require('../controllers/form.controller')

const router = express.Router()

/*
 * @route POST api/form
 * @desc Create a new form
 * @access Public
 */
router.post('/', createForm)

/*
 * @route GET api/form
 * @desc get all available forms
 * @access Public
 */
router.get('/', getForms)

module.exports = router
