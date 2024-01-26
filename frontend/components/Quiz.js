import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

function Quiz(props) {
  useEffect(() => {
    // Check if a quiz is already present before fetching a new one
    if (!props.quiz) {
      props.fetchQuiz();
    }
  }, []);

  const submitAnswerDisabled =
    !props.selectedAnswer || !props.selectedAnswer.text.trim();

  const handleAnswerSelection = (answer) => {
    // Dispatch an action to select the answer
    props.selectAnswer(answer);
  };

  return (
    <div id="wrapper">
      {props.quiz ? (
        <>
          <h2>{props.quiz.question}</h2>

          <div id="quizAnswers">
            {props.quiz.answers.map((answer) => (
              <div
                key={answer.answer_id}
                className={
                  props.selectedAnswer?.answer_id === answer.answer_id
                    ? "answer selected"
                    : "answer"
                }
              >
                {answer.text}
                <button onClick={() => handleAnswerSelection(answer)}>
                  {props.selectedAnswer?.answer_id === answer.answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              props.postAnswer(
                props.quiz.quiz_id,
                props.selectedAnswer.answer_id
              )
            }
            id="submitAnswerBtn"
            disabled={submitAnswerDisabled}
          >
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
})(Quiz);
