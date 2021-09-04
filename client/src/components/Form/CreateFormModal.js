import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const CreateFormModal = (props) => {
	const [ showTextArea, setShowTextArea ] = useState(false)
	const [ formData, setFormData ] = useState({
		question: '',
		answerType: 1,
		options: ""
	})

	const changeHandler = e => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}

	const submitHandler = e => {
		e.preventDefault()
	}

	const { question, answerType, options } = formData
	
	useEffect(() => {
		// Dropdown values 1. Text, 2. Multi choice 3. Single choice
		// Show text are only when 2 OR 3
		answerType === "2" || answerType === "3" ?
			setShowTextArea(true) :
		setShowTextArea(false)
	}, [ answerType ])
	

	return (
		<Modal
			{ ...props }
			size="lg"
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
					<Form.Control type="text" name="question" size="lg" placeholder="Type your Question/Title here" value={ question } onChange={ changeHandler }/>
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
        <Button variant="outline-primary">Add Question</Button>
      </Modal.Footer>
		
		</Modal>
	)
}

export default CreateFormModal
