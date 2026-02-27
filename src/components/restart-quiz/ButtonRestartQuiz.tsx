import { useQuiz } from "../../hooks/useQuize";

function ButtonRestartQuiz() {
  const { dispatch } = useQuiz();
  return (
    <button
      className="btn btn-restart"
      onClick={() => dispatch({ type: "restartQuiz" })}
    >
      Restart Quiz
    </button>
  );
}

export default ButtonRestartQuiz;
