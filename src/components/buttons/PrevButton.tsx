import { useQuiz } from "../../hooks/useQuize";

function PrevButton() {
  const { dispatch, index } = useQuiz();

  return index !== 0 && (
    <button
      onClick={() => dispatch({ type: "prevQuestion" })}
      className="btn btn-ui prev"
    >
      Prev Question
    </button>
  );
}

export default PrevButton;
