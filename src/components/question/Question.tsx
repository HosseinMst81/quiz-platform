import "./Question.css";
import Options from "../options/Options";
import { useQuiz } from "../../hooks/useQuize";
function Question() {
  const { index ,questions } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4 className="question">
        <strong>Q{index + 1}: </strong>
        {question.question}
      </h4>

      <Options question={question} />
    </div>
  );
}

export default Question;
