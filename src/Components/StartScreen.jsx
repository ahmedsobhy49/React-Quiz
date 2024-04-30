import React from "react";

export default function StartScreen({
  numOfQuestions,
  handle_LetsStart_ButtonClick,
}) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h4>{numOfQuestions} Questions to Test Your React Mastery</h4>
      <button className="btn btn-ui" onClick={handle_LetsStart_ButtonClick}>
        Let's Start
      </button>
    </div>
  );
}
