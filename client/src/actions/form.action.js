import { LOAD_LIST_OF_FORMS, CREATE_FORM, FORM_ERROR } from '../utils/types'
import axios from 'axios'

export const createForm = form => async dispatch => {
	try {
		const { data } = await axios.post('api/form', { ...form })
		dispatch({
			type: CREATE_FORM,
			payload: data.form
		})
	} catch (error) {
		dispatch({
			type: FORM_ERROR
		})
	}
}

export const getForms = () => async dispatch => {
	try {
		const { data } = await axios.get('api/form')
		dispatch({
			type: LOAD_LIST_OF_FORMS,
			payload: data.forms
		})
	} catch (error) {
		dispatch({
			type: FORM_ERROR
		})
	}
}
