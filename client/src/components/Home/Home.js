import React, {Fragment, useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import CreateFormModal from '../Form/CreateFormModal'
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_LIST_OF_FORMS } from '../../utils/types'
import {Link} from 'react-router-dom'

const Home = () => {
	const [ createFormModalShow, setCreateFormModalShow ] = useState(false)
	const dispatch = useDispatch()
	// Redux selectors
	const availableForms = useSelector(state => state.forms.availableForms)

	// Loads list of forms from localStorage
	// TODO: replace it with useMemo
	useEffect(() => {
		const forms = JSON.parse(localStorage.getItem("forms"))
		forms && dispatch({type: LOAD_LIST_OF_FORMS, payload: [...forms]})
	},[])
	return (
		<Fragment>
			<Button variant="success" onClick={ () => setCreateFormModalShow(true) }>Create a new form</Button>
			<CreateFormModal show={ createFormModalShow } onHide={ () => setCreateFormModalShow(false) } />
			{availableForms?.map(form => <Link key={ form._id+ "\n" } to={`/form/${form._id}`}><p> Open </p> { form._id }</Link>)}
		</Fragment>
	)
}

export default Home
