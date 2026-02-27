import { ArrowRight } from "lucide-react";
import "./QuizCompleteScreeen.css";
import { useEffect, useState } from "react";
import { useQuiz } from "../../hooks/useQuize";

type QuizCompleteScreenProps = {
  onViewResults: () => void;
};

function QuizCompleteScreen({ onViewResults }: QuizCompleteScreenProps) {
  const { answeredCount, numQuestions } = useQuiz();
  const [phase, setPhase] = useState<"enter" | "ready">("enter");

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 50);
    return () => clearTimeout(t);
  }, []);

  const skipped = numQuestions - answeredCount;

  return (
    <div
      className={`complete-screen ${phase === "ready" ? "complete-screen--ready" : ""}`}
    >
      {/* Burst rings */}
      <div className="complete-burst">
        <div className="complete-ring complete-ring--1" />
        <div className="complete-ring complete-ring--2" />
        <div className="complete-ring complete-ring--3" />
      </div>

      {/* Checkmark */}
      <div className="complete-icon-wrapper">
        <svg
          className="complete-checkmark"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="complete-checkmark-circle"
            cx="26"
            cy="26"
            r="24"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            className="complete-checkmark-check"
            d="M14 26 L22 34 L38 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Headline */}
      <div className="complete-text">
        <h2 className="complete-title">Quiz Complete!</h2>
        <p className="complete-body">
          You answered{" "}
          <strong className="complete-highlight">{answeredCount}</strong> out of{" "}
          <strong>{numQuestions}</strong> questions.
          {skipped > 0 && (
            <>
              {" "}
              <span className="complete-skipped">
                {skipped} {skipped === 1 ? "was" : "were"} skipped.
              </span>
            </>
          )}
        </p>
      </div>

      {/* CTA */}
      <button className="complete-btn" onClick={onViewResults}>
        <span>View Results</span>
        <ArrowRight />
      </button>
    </div>
  );
}

export default QuizCompleteScreen;
