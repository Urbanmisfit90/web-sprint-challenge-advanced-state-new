// Quiz.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";

function Quiz(props) {
  console.log(props);

  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const submitAnswerDisabled =
    !props.selectedAnswer || !props.selectedAnswer.text.trim();

  return (
    <div id="wrapper">
      {props.quiz ? (
        <>
          <h2>{props.quiz.question}</h2>

          <div id="quizAnswers">
            <div
              className={
                props.selectedAnswer?.answer_id ===
                props.quiz.answers[0].answer_id
                  ? "answer selected"
                  : "answer"
              }
            >
              {props.quiz.answers[0].text}
              <button onClick={() => props.selectAnswer(props.quiz.answers[0])}>
                {props.selectedAnswer?.answer_id ===
                props.quiz.answers[0].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>

            <div
              className={
                props.selectedAnswer?.answer_id ===
                props.quiz.answers[1].answer_id
                  ? "answer selected"
                  : "answer"
              }
            >
              {props.quiz.answers[1].text}
              <button onClick={() => props.selectAnswer(props.quiz.answers[1])}>
                {props.selectedAnswer?.answer_id ===
                props.quiz.answers[1].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>
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
