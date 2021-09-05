import { LOAD_LIST_OF_FORMS } from '../utils/types'

const initialState = {
	availableForms: [],
	loading: true
}

export default (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case LOAD_LIST_OF_FORMS:
			return { ...state, loading: false, availableForms: payload }
		default:
			return state
	}
}