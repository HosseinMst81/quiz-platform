import type { Action } from "../../App";

function ButtonRestartQuiz({
  dispatch,
}: {
  dispatch: React.ActionDispatch<[action: Action]>;
}) {
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
