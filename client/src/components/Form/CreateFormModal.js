import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useDispatch } from 'react-redux'
import { LOAD_LIST_OF_FORMS } from '../../utils/types'
import { v4 as uuidv4 } from 'uuid';
import ListGroup from 'react-bootstrap/ListGroup'
import {getAnswerTypeName} from "../../utils/utils"

const CreateFormModal = (props) => {
	const [ showTextArea, setShowTextArea ] = useState(false)
	const [questions, setQuestions] = useState([])
	const [ formData, setFormData ] = useState({
		questionTitle: '',
		answerType: 1,
		options: ""
	})

	const { questionTitle, answerType, options } = formData

	const dispatch = useDispatch()
	useEffect(() => {
		// Dropdown values 1. Text, 2. Multi choice 3. Single choice
		// Show text are only when 2 OR 3
		answerType === "2" || answerType === "3" ?
			setShowTextArea(true) :
		setShowTextArea(false)
	}, [ answerType ])

	const changeHandler = e => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}

	// Add a question to questions state and clear previous user inputs
	const addQuestion = e => {
		e.preventDefault()
		const listOfQuestions = [ ...questions ]
		listOfQuestions.push({ ...formData, options : options?.split("\n") })
		setQuestions(listOfQuestions)
		console.log(options);
		setFormData({
		questionTitle: '',
		answerType: 1,
		options: ""
		})
	}

	const submitHandler = e => {
		e.preventDefault()
		// If last question is not added on questions state, add it
		// usecase when user clicks on Publish form without adding the latest question by clicking on add question button
		if (questionTitle !== "")
			addQuestion(e)
		
		// Get list of forms from localStorage and add current form
		let listForms = JSON.parse(localStorage.getItem("forms")) || []
		const newForm = {
			_id: uuidv4(),
			questions: [ ...questions ],
			createdAt: Date.now()
		}
		listForms.push(newForm)
		localStorage.setItem("forms", JSON.stringify(listForms))
		
		// Load latest list of forms on redux store
		dispatch({
			type: LOAD_LIST_OF_FORMS,
			payload: listForms
		})

		// Clear questions state
		setQuestions([])

		// Hide the Modal once form is published
		props.onHide()
	}

	return (
		<Modal
			{ ...props }
			size="lg"
			backdrop="static"
			aria-labelledby="contained-modal"
			centered>
			
			<Modal.Header closeButton >
				<h4> Create a new Form</h4>
			</Modal.Header>

			<Modal.Body>
				{/* Input: Question/Title */}
				<FloatingLabel controlId="floatingInput"
					label="Type your Question/Title here"
					className="mb-3">
					<Form.Control type="text" name="questionTitle" size="lg" placeholder="Type your Question/Title here" value={ questionTitle } onChange={ changeHandler }/>
				</FloatingLabel>
				
				{/* Input: Answer type */}
				<FloatingLabel controlId="floatingSelect" label="Answer Type" className="mb-3">
					<Form.Select aria-label="Floating label select example" name="answerType" value={ answerType } onChange={ changeHandler }>
						<option value="1">Text</option>
						<option value="2">Mutli choice Checkbox</option>
						<option value="3">Single choice Radio</option>
					</Form.Select>
				</FloatingLabel>
			
				{/* Input: List of options */}
				{showTextArea && <FloatingLabel
					controlId="floatingInput"
					label="Type your list of options here, sepearated by new lines"
					className="mb-3">
					<Form.Control as="textarea" name="options" style={ { height: '100px' } } value={ options } onChange={ changeHandler }/>
				</FloatingLabel>}
			
				
			</Modal.Body>
			
			<Modal.Footer>
				<Button variant="success" onClick={submitHandler}>Publish Form</Button>
        <Button variant="outline-primary" onClick={addQuestion}>Add Question</Button>
			</Modal.Footer>
			
			{/* Render all previously added question for current form */ }
					<ListGroup >
				{questions?.map(question =>
						<ListGroup.Item >
							<p className="mb-0"> { question.questionTitle } </p>
						<p className="mb-0"> { getAnswerTypeName(question.answerType) }</p>
						<p> {question?.options.toString()}</p>
						</ListGroup.Item>
				) }
				</ListGroup>
		</Modal>
	)
}

export default CreateFormModal
