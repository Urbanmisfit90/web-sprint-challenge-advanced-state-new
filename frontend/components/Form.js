// Form.js
import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    props.inputChange(evt.target.id, evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (props.isInputsValid) {
      props.postQuiz(
        props.form.newQuestion,
        props.form.newTrueAnswer,
        props.form.newFalseAnswer
      );
    } else {
      // Handle invalid form submission (e.g., show a message)
      console.log("Invalid form submission");
    }
  };

  const isDisabled = () => {
    // Ensure this always returns a boolean (true or false)
    return Object.values(props.form).some((value) => value.trim().length <= 1);
  };

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
      <button id="submitNewQuizBtn" disabled={isDisabled()}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    form: state.form,
    isInputsValid: Object.values(state.form).every(
      (value) => value.trim().length > 1
    ),
  };
};

export default connect(mapStateToProps, {
  inputChange: actionCreators.inputChange,
  postQuiz: actionCreators.postQuiz,
})(Form);
