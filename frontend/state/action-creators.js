//action-creators.js
// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "./action-types";

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(answer) {
  return {
    type: "SET_SELECTED_ANSWER",
    payload: answer,
  };
}

export function setMessage(message) {
  return {
    type: "SET_MESSAGE",
    payload: message,
  };
}

export function setQuiz(quiz) {
  return {
    type: "SET_QUIZ_INTO_STATE",
    payload: quiz,
  };
}

export function inputChange(id, value) {
  return {
    type: "INPUT_CHANGE",
    payload: {
      id,
      value,
    },
  };
}

export function resetForm() {
  return {
    type: "RESET_Form",
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get("http://localhost:9000/api/quiz/next").then((res) => {
      dispatch(setQuiz(res.data));
    });
  };
}

export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    const body = { quiz_id: quizId, answer_id: answerId };
    axios
      .post("http://localhost:9000/api/quiz/answer", body)
      .then((res) => {
        console.log(res.data);
        // You can dispatch a message if needed
        dispatch(setMessage(res.data.message));
      })
      .catch((error) => {
        // Handle error, log or display a message
        console.error("Error posting answer:", error);
      })
      .finally(() => {
        // Fetch the next quiz regardless of success or failure
        dispatch(fetchQuiz());
      });
  };
}

export function postQuiz(newQuestion, newTrueAnswer, newFalseAnswer) {
  return function (dispatch) {
    const body = {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    };
    axios
      .post("http://localhost:9000/api/quiz/new", body)
      .then(() => {
        dispatch(resetForm());
        dispatch(setMessage(`Congrats: "${newQuestion}" is a great question`));
      })
      .catch((error) => {
        // Handle error, log or display a message
        console.error("Error posting quiz:", error);
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
