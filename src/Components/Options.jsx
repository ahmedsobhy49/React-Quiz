import React from "react";
import { useRef } from "react";
export default function Options({
  handleShowNextButton,
  options,
  correctOption,
  points,
  handleScore,
}) {
  const optionRefs = useRef([]);

  function handleButtonOptionClick(idx, e) {
    // Loop through option refs
    optionRefs.current.forEach((optionRef, index) => {
      if (index === idx) {
        // Apply 'answer' class to clicked button
        optionRef.classList.add("answer");
      }
      if (index === correctOption) {
        // Apply 'correct' class to correct option
        optionRef.classList.add("correct");
      } else {
        // Apply 'wrong' class to incorrect options
        optionRef.classList.add("wrong");
      }
      // disable all buttons after click on any button
      optionRef.disabled = true;
      handleShowNextButton();
    });
    if (e.target.classList.contains("correct")) {
      handleScore(points);
    }
  }

  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <button
            key={option}
            className={`btn btn-option`}
            ref={(el) => (optionRefs.current[index] = el)}
            onClick={(e) => {
              handleButtonOptionClick(index, e);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
