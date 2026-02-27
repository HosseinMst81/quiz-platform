import { useQuiz } from "../../hooks/useQuize";

function QuizResult() {
  const { questions, answers } = useQuiz();
  return (
    <div className="result-container">
      {/* ── Answer Map ── */}
      <p className="result-map-title">Answer Review</p>
      <div className="result-map-grid">
        {questions.map((question, idx) => {
          const userAnswer = answers[idx];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === question.correctOption;
          const status = !isAnswered
            ? "skipped"
            : isCorrect
              ? "correct"
              : "wrong";

          return (
            <div key={question.id} className={`result-card ${status}`}>
              <div className="result-card-header">
                <span className="result-card-num">Question {idx + 1}</span>
                <span className={`result-status-tag ${status}`}>
                  {status === "correct" && "✓ Correct"}
                  {status === "wrong" && "✗ Wrong"}
                  {status === "skipped" && "— Skipped"}
                </span>
              </div>

              <p className="result-card-question">{question.question}</p>

              <div className="result-options-list">
                {question.options.map((option, optIdx) => {
                  const isCorrectOpt = optIdx === question.correctOption;
                  const isUserOpt = optIdx === userAnswer;
                  const optionLetter = ["A", "B", "C", "D"];

                  let className = "result-option";
                  if (isCorrectOpt) className += " correct-answer";
                  if (isUserOpt && !isCorrectOpt) className += " wrong-answer";

                  return (
                    <div key={option} className={className}>
                      <span className="result-option-letter">
                        {optionLetter[optIdx]}
                      </span>
                      <span className="result-option-text">{option}</span>
                      <span className="result-option-badges">
                        {isCorrectOpt && (
                          <span className="badge-correct">correct</span>
                        )}
                        {isUserOpt && !isCorrectOpt && (
                          <span className="badge-wrong">your answer</span>
                        )}
                        {isUserOpt && isCorrectOpt && (
                          <span className="badge-correct">your answer ✓</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="result-card-footer">
                <span className="result-points-text">
                  {isCorrect
                    ? `+${question.points} pts`
                    : `0 / ${question.points} pts`}
                </span>
              </div>

              {!isAnswered && (
                <p className="result-no-answer">
                  ⚠️ This question was not answered
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizResult;
