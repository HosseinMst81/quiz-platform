import "./Progress.css";
type ProgressProps = {
  numQuestions: number;
  index: number;
  answered: number;
};
function Progress({ numQuestions, index ,answered}: ProgressProps) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index}></progress>
      <div className="progress-text">
        <span>Question <strong>{index + 1}</strong> of {numQuestions}</span>
        <span><strong>{answered}</strong> Answered</span>
      </div>
    </header>
  );
}

export default Progress;
