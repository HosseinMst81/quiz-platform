import { useState } from "react";
import type { Action } from "../../App";

function ButtonRestartQuiz({dispatch}: {dispatch: React.ActionDispatch<[action: Action]>}) {
  const [confirmationModal,setConfirmationModal] = useState<boolean>(false)
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
