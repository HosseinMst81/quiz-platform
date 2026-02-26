import './Options.css'
import type { Action, QuestionType, Status } from "../../App";

type OptionsProps = {
  question: QuestionType;
  dispatch: React.Dispatch<Action>;
  answers: (number | undefined)[];
  index: number;
  status: Status;
};

function Options({ question, dispatch, answers, index, status }: OptionsProps) {
  const isFinished = status === "finished";
  const optionLetter = ["A", "B", "C", "D"];
  return (
    <div className="options">
      {question.options.map((option, idx) => {
        const isSelected = answers[index] === idx;
        const isCorrect = idx === question.correctOption;

        let className = "btn btn-option";

        if (isSelected) className += " answer";

        if (isFinished) {
          if (isCorrect) className += " correct";
          if (isSelected && !isCorrect) className += " wrong";
        }

        return (
          <button
            key={option}
            className={className}
            disabled={isFinished}
            onClick={() =>
              dispatch({
                type: "selectAnswer",
                payload: isSelected ? undefined : idx,
              })
            }
          >
            <span className="option-letter">{optionLetter[idx]}</span> {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
