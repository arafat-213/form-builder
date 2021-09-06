// React
import React, { useEffect, useState, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
// Redux
import { useSelector } from 'react-redux'
// Bootstrap
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SingleForm = () => {
	const availableForms = useSelector(state => state.forms.availableForms)

	const [currentForm, setCurrentForm] = useState({})
	const [formData, setFormData] = useState({
		name: '',
		email: ''
	})
	const { name, email } = formData
	const { formId } = useParams()
	const history = useHistory()

	// Load form with formId from availableForms
	useEffect(() => {
		console.log(formId)
		let form = availableForms.find(form => form._id + '' === formId)
		setCurrentForm({ ...form })
	}, [formId])

	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<Form>
			<h4>{currentForm?.formName}</h4>
			{/* User name and email - display on every form*/}
			<Fragment>
				<FloatingLabel
					controlId='floatingInput'
					label='Email address'
					className='mb-3'>
					<Form.Control
						type='email'
						required
						name='email'
						value={email}
						onChange={changeHandler}
						placeholder='Enter your email address'
					/>
				</FloatingLabel>
				<FloatingLabel controlId='floatingName' label='Name'>
					<Form.Control
						type='text'
						value={name}
						name='name'
						onChange={changeHandler}
						placeholder='Enter your name here'
						className='mb-3'
					/>
				</FloatingLabel>
			</Fragment>

			{/* Questions from currentForm */}
			{currentForm?.questions?.map(
				({ questionTitle, options, answerType }) => (
					<Fragment>
						<h5 className='mb-2'>{questionTitle}</h5>
						{/* If answerType is Text, render a text input */}
						{answerType === 1 && (
							<Form.Control
								size='lg'
								type='text'
								placeholder='Type your response here'
							/>
						)}

						{/* If answerType is Multichoice, render checkboxes */}
						{answerType === '2' &&
							options?.map((option, index) => (
								<Form.Check
									key={index}
									name={questionTitle}
									value={option}
									type='checkbox'
									label={option}
								/>
							))}

						{/* If answerType is Single choice, render radio buttons */}
						{answerType === '3' &&
							options?.map((option, index) => (
								<Form.Check
									key={index}
									type='radio'
									value={option}
									name={questionTitle}
									label={option}
								/>
							))}
					</Fragment>
				)
			)}
			<div className='d-flex w-100 mt-3 flex-row-reverse'>
				<Button variant='success' className='p2 mx-1'>
					Submit Respone
				</Button>
				<Button
					variant='outline-secondary'
					className='p-2'
					onClick={() => history.goBack()}>
					Discard
				</Button>
			</div>
		</Form>
	)
}

export default SingleForm
