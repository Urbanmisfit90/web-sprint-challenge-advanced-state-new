/// Form.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
  console.log(props);

  const [isInputsValid, setIsInputsValid] = useState(true);

  const onChange = evt => {
    props.inputChange(evt.target.id, evt.target.value);
  }

  const onSubmit = evt => {
    evt.preventDefault();

    // Check if all inputs have values more than one character in length after trimming
    const isValid = Object.values(props.form).every(value => value.trim().length > 1);
    setIsInputsValid(isValid);

    if (isValid) {
      props.postQuiz(props.form.newQuestion, props.form.newTrueAnswer, props.form.newFalseAnswer);
    } else {
      // Handle invalid form submission (e.g., show a message)
      console.log('Invalid form submission');
    }
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        value={props.form.newQuestion}
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        value={props.form.newTrueAnswer}
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        value={props.form.newFalseAnswer}
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={!isInputsValid}>
        Submit new quiz
      </button>
    </form>
  )
}

const mapStateToProps = (state) => {
   return {
     form: state.form
   }
}

export default connect(mapStateToProps, { inputChange: actionCreators.inputChange, postQuiz: actionCreators.postQuiz })(Form);
