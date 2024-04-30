import React, { useReducer, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  currentDisplayedQuestionIndex: 0,
  showNextButton: false,
  score: 0,
  dark: true,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    currentDisplayedQuestionIndex,
    showNextButton,
    score,
    dark,
  } = state;

  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return { ...state, status: "loading" };
      case "ERROR":
        return { ...state, status: "error" };
      case "DATA_RECEVIED":
        return { ...state, status: "ready", questions: action.payload };
      case "ACTIVE":
        return { ...state, status: "active" };
      case "SHOW_NEXT_BUTTON":
        return { ...state, showNextButton: true };
      case "SHOW_NEXT_QUESTION":
        return {
          ...state,
          currentDisplayedQuestionIndex:
            state.currentDisplayedQuestionIndex + 1,
          showNextButton: false,
        };
      case "CORRECR_ANSWER":
        return { ...state, score: state.score + action.payload };
      case "FINISH":
        return { ...state, status: "finish" };
      case "RESET":
        return { ...initialState, dark: state.dark };
      case "TOGGLE_DARK":
        return { ...state, dark: !state.dark };
      default:
        throw new Error("action unknown");
    }
  }

  async function fetchQuestions() {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.get("http://localhost:9000/questions");
      dispatch({ type: "DATA_RECEVIED", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!dark) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [dark]);

  function handle_LetsStart_ButtonClick() {
    dispatch({ type: "ACTIVE" });
  }

  function handleShowNextButton() {
    dispatch({ type: "SHOW_NEXT_BUTTON" });
  }

  function showingNextQuestion() {
    if (currentDisplayedQuestionIndex === questions.length - 1) {
      dispatch({ type: "FINISH" });
      return;
    }
    dispatch({ type: "SHOW_NEXT_QUESTION" });
  }

  function handleScore(points) {
    dispatch({ type: "CORRECR_ANSWER", payload: points });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
    fetchQuestions();
  }

  function toggleDark() {
    dispatch({ type: "TOGGLE_DARK" });
  }

  return (
    <div className="app">
      <Header toggleDark={toggleDark} dark={dark} />
      {status === "active" && (
        <ProgressBar
          currentDisplayedQuestionIndex={currentDisplayedQuestionIndex}
          score={score}
        />
      )}
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen
          numOfQuestions={questions.length}
          handle_LetsStart_ButtonClick={handle_LetsStart_ButtonClick}
        />
      )}
      {status === "active" && (
        <Question
          currentDisplayedQuestion={questions[currentDisplayedQuestionIndex]}
          currentDisplayedQuestionIndex={currentDisplayedQuestionIndex}
          showNextButton={showNextButton}
          handleShowNextButton={handleShowNextButton}
          showingNextQuestion={showingNextQuestion}
          handleScore={handleScore}
        />
      )}

      {status === "finish" && (
        <FinishScreen score={score} handleReset={handleReset} />
      )}
    </div>
  );
}
