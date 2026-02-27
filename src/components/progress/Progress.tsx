import { useQuiz } from "../../hooks/useQuize";
import "./Progress.css";

function Progress() {
  const { numQuestions, index, answeredCount } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index}></progress>
      <div className="progress-text">
        <span>
          Question <strong>{index + 1}</strong> of {numQuestions}
        </span>
        <span>
          <strong>{answeredCount}</strong> Answered
        </span>
      </div>
    </header>
  );
}

export default Progress;
