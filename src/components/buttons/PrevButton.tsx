import type { Action } from "../../App";

function PrevButton({
    dispatch,
  }: {
    dispatch: React.ActionDispatch<[action: Action]>;
  }) {
    return (
      <button
        onClick={() => dispatch({ type: "prevQuestion" })}
        className="btn btn-ui prev"
      >
        Prev Question
      </button>
    );
  }

export default PrevButton;
