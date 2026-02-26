import "./Question.css";
import type { Action, QuestionType, Status } from "../../App";
import Options from "../options/Options";

type QuestionProps = {
  question: QuestionType;
  dispatch: React.Dispatch<Action>;
  answers: (number | undefined)[];
  index: number;
  status: Status;
};

function Question({
  question,
  dispatch,
  answers,
  index,
  status,
}: QuestionProps) {
  return (
    <div>
      <h4 className="question">
        <strong>Q{index + 1}: </strong>
        {question.question}
      </h4>

      <Options
        question={question}
        dispatch={dispatch}
        answers={answers}
        index={index}
        status={status}
      />
    </div>
  );
}

export default Question;
