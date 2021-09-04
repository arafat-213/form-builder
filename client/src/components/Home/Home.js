import React, {Fragment, useState} from 'react'
import Button from 'react-bootstrap/Button'
import CreateFormModal from '../Form/CreateFormModal'

const Home = () => {
	const [createFormModalShow, setCreateFormModalShow] = useState(false)
	return (
		<Fragment>
			<Button variant="success" onClick={ () => setCreateFormModalShow(true) }>Create a new form</Button>
			<CreateFormModal show={ createFormModalShow } onHide={() => setCreateFormModalShow(false)} />
		</Fragment>
	)
}

export default Home
