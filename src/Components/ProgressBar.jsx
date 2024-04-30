import React from "react";

export default function ProgressBar({ currentDisplayedQuestionIndex, score }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="colored-bar"
          style={{ width: `${6.66666667 * currentDisplayedQuestionIndex}%` }}
        ></div>
      </div>
      <div className="progress-bar-details">
        <p>Question {currentDisplayedQuestionIndex + 1} </p>
        <p>{score}/280</p>
      </div>
    </div>
  );
}
