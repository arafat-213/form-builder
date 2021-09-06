import React, { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import CreateFormModal from '../Form/CreateFormModal'
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_LIST_OF_FORMS } from '../../utils/types'
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { getForms } from '../../actions/form.action'

const Home = () => {
	const [createFormModalShow, setCreateFormModalShow] = useState(false)
	const [formName, setFormName] = useState('')
	const dispatch = useDispatch()
	// Redux selectors
	const availableForms = useSelector(state => state.forms.availableForms)

	const changeHandler = e => {
		setFormName(e.target.value)
	}

	const APP_URL = process.env.REACT_APP_URL || 'http://localhost:3000/'
	// Loads list of forms from localStorage
	// TODO: replace it with useMemo
	useEffect(() => {
		// const forms = JSON.parse(localStorage.getItem('forms'))
		// forms && dispatch({ type: LOAD_LIST_OF_FORMS, payload: [...forms] })
		dispatch(getForms())
	}, [])
	return (
		<Fragment>
			<Form>
				<Row className='my-5'>
					<Col md={8}>
						<FloatingLabel
							// className='px-1 py-2'
							controlId='floatingInput'
							label='Give your form a name here'>
							<Form.Control
								type='text'
								name='questionTitle'
								size='lg'
								placeholder='Type your Question/Title here'
								value={formName}
								required
								onChange={changeHandler}
							/>
						</FloatingLabel>
					</Col>
					<Col md={4}>
						<Button
							variant='success'
							size='lg'
							className='mt-1'
							onClick={() => setCreateFormModalShow(true)}>
							Create a new form
						</Button>
					</Col>
				</Row>
				<CreateFormModal
					show={createFormModalShow}
					onHide={() => setCreateFormModalShow(false)}
					formName={formName}
				/>
			</Form>
			{availableForms.length > 0 ? (
				<Table striped bordered hover>
					<thead>
						<td>Form Name</td>
						<td>Form URL</td>
						<td>Created At</td>
					</thead>
					<tbody>
						{availableForms?.map(form => (
							<tr>
								<td>{form?.formName}</td>
								<td>
									<Link
										key={form._id + '\n'}
										to={`/form/${form._id}`}>
										{APP_URL + form._id}
									</Link>
								</td>
								<td>
									{new Date(form.createdAt).toLocaleString(
										'en-IN'
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h2>
					Oops...Looks like empty here. Start creating a form by
					clicking on Create a new form button above!!
				</h2>
			)}
		</Fragment>
	)
}

export default Home
