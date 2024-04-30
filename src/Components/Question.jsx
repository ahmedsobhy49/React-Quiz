import Options from "./Options";
export default function Question({
  currentDisplayedQuestion,
  currentDisplayedQuestionIndex,
  handleShowNextButton,
  showNextButton,
  showingNextQuestion,
  handleScore,
}) {
  const { question, options, correctOption, points } = currentDisplayedQuestion;
  return (
    <div className="questions">
      <h2>{question}</h2>
      <Options
        handleShowNextButton={handleShowNextButton}
        options={options}
        correctOption={correctOption}
        handleScore={handleScore}
        points={points}
      />
      {showNextButton && (
        <button className="btn" onClick={() => showingNextQuestion(points)}>
          {currentDisplayedQuestionIndex < 14 ? "Next" : "Finish"}
        </button>
      )}
    </div>
  );
}
