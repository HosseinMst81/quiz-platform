import { useState } from "react";
import type { Action, Status } from "../../App";
import FinishConfirmModal from "../finish-modal/FinishConfirmModal";

type NextButtonProps = {
  status: Status;
  index: number;
  numQuestions: number;
  answeredCount: number;
  dispatch: React.ActionDispatch<[action: Action]>;
};

function NextButton({
  index,
  dispatch,
  numQuestions,
  answeredCount,
  status,
}: NextButtonProps) {
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
          answeredCount={answeredCount}
          totalCount={numQuestions}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default NextButton;
