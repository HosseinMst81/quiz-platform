import "./AnswerKeySidebar.css";
import type { Action, QuestionType } from "../../App";

type Props = {
  questions: QuestionType[];
  answers: (number | undefined)[];
  dispatch: React.ActionDispatch<[action: Action]>;
};

const letters = ["A", "B", "C", "D"];

function AnswerKeySidebar({ questions, answers, dispatch }: Props) {
  return (
    <aside className="answer-key">
      <h4 className="answer-key-title">Answer Sheet</h4>

      <div className="answer-sheet">
        {questions.map((q, i) => {
          const userAnswer = answers[i];

          return (
            <div key={q.id} className="answer-row">
              <span className="row-number">{i + 1}</span>

              {letters.map((letter, idx) => {
                const isCorrectOption = idx === q.correctOption;
                const isSelected = userAnswer === idx;
                const isUnanswered = userAnswer === undefined;

                let stateClass = "";

                if (isSelected && isCorrectOption) {
                  stateClass = "correct";
                } else if (isSelected && !isCorrectOption) {
                  stateClass = "wrong";
                } else if (isUnanswered && isCorrectOption) {
                  stateClass = "unanswered";
                }

                return (
                  <div
                    key={letter}
                    className={`answer-box ${stateClass}`}
                    onClick={() =>
                      dispatch({ type: "goToQuestion", payload: i })
                    }
                  >
                    <span className="letter">{letter}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="answer-legend">
        <div>
          <span className="legend-box correct"></span> Correct
        </div>
        <div>
          <span className="legend-box wrong"></span> Wrong
        </div>
        <div>
          <span className="legend-box unanswered"></span> Not Answered
        </div>
      </div>
    </aside>
  );
}

export default AnswerKeySidebar;
