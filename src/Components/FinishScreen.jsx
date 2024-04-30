import React from "react";

export default function FinishScreen({ score, handleReset }) {
  return (
    <>
      <div className="finish-container">
        <p>
          YOU SCORED <span>{score}</span> OUT OF <span>280</span> POINTS (
          <span> {Math.trunc((score / 280) * 100)}</span>
          %)
        </p>
      </div>
      <button className="btn btn-start" onClick={() => handleReset()}>
        Start Again
      </button>
    </>
  );
}
