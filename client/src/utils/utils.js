export const getAnswerTypeName = answerType => {
	if (answerType === "2")
		return "Multi choice"
	else if (answerType === "3")
		return "Single choice"
	return "Text"
}