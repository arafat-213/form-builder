// React
import React, { useEffect, useState } from 'react'
// Redux
import { useDispatch } from 'react-redux'
import { createForm, getForms } from '../../actions/form.action'
// Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import ListGroup from 'react-bootstrap/ListGroup'
// Utils
import { getAnswerTypeName } from '../../utils/utils'

const CreateFormModal = props => {
	const [showTextArea, setShowTextArea] = useState(false)
	const [questions, setQuestions] = useState([])
	const [formData, setFormData] = useState({
		questionTitle: '',
		answerType: 1,
		options: ''
	})

	const { questionTitle, answerType, options } = formData

	const dispatch = useDispatch()
	useEffect(() => {
		// Dropdown values 1. Text, 2. Multi choice 3. Single choice
		// Show text are only when 2 OR 3
		answerType === '2' || answerType === '3'
			? setShowTextArea(true)
			: setShowTextArea(false)
	}, [answerType])

	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	// Add a question to questions state and clear previous user inputs
	const addQuestion = e => {
		e.preventDefault()
		const listOfQuestions = [...questions]
		listOfQuestions.push({ ...formData, options: options?.split('\n') })
		setQuestions(listOfQuestions)
		console.log(options)
		setFormData({
			questionTitle: '',
			answerType: 1,
			options: ''
		})
	}

	const removeQuestion = questionTitle => {
		const listOfQuestions = [...questions]
		const newList = listOfQuestions.filter(
			question => question.questionTitle !== questionTitle
		)
		setQuestions(newList)
	}

	const submitHandler = e => {
		e.preventDefault()
		// If last question is not added on questions state, add it
		// usecase when user clicks on Publish form without adding the latest question by clicking on add question button
		if (questionTitle !== '') addQuestion(e)

		const newForm = {
			formName: props.formName || 'Untitled form',
			questions: [...questions]
		}

		// Create a new form
		dispatch(createForm(newForm))

		// update the list of form once a new form is created
		dispatch(getForms())

		// Clear questions state
		setQuestions([])

		// Hide the Modal once form is published
		props.onHide()
	}

	return (
		<Modal
			{...props}
			size='lg'
			backdrop='static'
			aria-labelledby='contained-modal'
			centered>
			<Form>
				<Modal.Header closeButton>
					<h3>{props.formName}</h3>
				</Modal.Header>

				<Modal.Body>
					{/* Input: Question/Title */}
					<FloatingLabel
						controlId='floatingInput'
						label='Type your Question/Title here'
						className='mb-3'>
						<Form.Control
							type='text'
							name='questionTitle'
							size='lg'
							required
							placeholder='Type your Question/Title here'
							value={questionTitle}
							onChange={changeHandler}
						/>
					</FloatingLabel>

					{/* Input: Answer type */}
					<FloatingLabel
						controlId='floatingSelect'
						label='Answer Type'
						className='mb-3'>
						<Form.Select
							aria-label='Floating label select example'
							name='answerType'
							value={answerType}
							onChange={changeHandler}>
							<option value='1'>Text</option>
							<option value='2'>Mutli choice Checkbox</option>
							<option value='3'>Single choice Radio</option>
						</Form.Select>
					</FloatingLabel>

					{/* Input: List of options */}
					{showTextArea && (
						<FloatingLabel
							controlId='floatingInput'
							label='Type your list of options here, sepearated by new lines'
							className='mb-3'>
							<Form.Control
								as='textarea'
								name='options'
								required
								style={{ height: '100px' }}
								value={options}
								onChange={changeHandler}
							/>
						</FloatingLabel>
					)}
				</Modal.Body>

				<Modal.Footer>
					<Button variant='success' onClick={submitHandler}>
						Publish Form
					</Button>
					<Button variant='outline-primary' onClick={addQuestion}>
						Add Question
					</Button>
				</Modal.Footer>

				{/* Render all previously added question for current form */}
				<ListGroup>
					{questions?.map((question, index) => (
						<ListGroup.Item key={index}>
							<p className='mb-0'> {question.questionTitle} </p>
							<p className='mb-0'>
								{' '}
								{getAnswerTypeName(question.answerType)}
							</p>
							<p className='mb-0'>
								{' '}
								{question?.options.toString()}
							</p>
							<i
								className='text-muted text-underline'
								onClick={e =>
									removeQuestion(question?.questionTitle)
								}
								style={{ cursor: 'pointer' }}>
								Remove
							</i>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Form>
		</Modal>
	)
}

export default CreateFormModal
