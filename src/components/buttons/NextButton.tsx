import { useState } from "react";
import { useQuiz } from "../../hooks/useQuize";
import FinishConfirmModal from "../finish-modal/FinishConfirmModal";

function NextButton() {
  const { numQuestions, index, dispatch,status } = useQuiz();
  const [showModal, setShowModal] = useState(false);
  const isLast = index === numQuestions - 1;
  const isFinished = status === "finished";
  
  function handleClick() {
    if (isLast) {
      setShowModal(true);
    } else {
      dispatch({ type: "nextQuestion" });
    }
  }

  function handleConfirm() {
    setShowModal(false);
    dispatch({ type: "nextQuestion" }); // triggers status: "finished" in reducer
  }

  return (
    <>
      {
        <button
          onClick={handleClick}
          className="btn btn-ui next"
          disabled={isFinished && isLast}
        >
          {isLast ? "Finish" : "Next Question"}
        </button>
      }
      {showModal && (
        <FinishConfirmModal
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default NextButton;
