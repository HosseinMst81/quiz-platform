import {
  BadgeCheck,
  BadgeMinus,
  BadgeQuestionMark,
  BadgeX,
} from "lucide-react";
import type { QuestionType } from "../../App";
import Stat from "../stat/Stat";

type FinalResultBannerProps = {
  questions: QuestionType[];
  answers: (number | undefined)[];
  totalPoints: number;
};
function FinalResultBanner({
  questions,
  answers,
  totalPoints,
}: FinalResultBannerProps) {
  const maxPoints = questions.reduce((acc, q) => acc + q.points, 0);
  const scorePercent = Math.round((totalPoints / maxPoints) * 100);
  const grade =
    scorePercent >= 90
      ? { label: "Excellent", color: "#34d399" }
      : scorePercent >= 70
        ? { label: "Good", color: "#38bdf8" }
        : scorePercent >= 50
          ? { label: "Fair", color: "#f59e0b" }
          : { label: "Needs Work", color: "#f87171" };
  const circumference = 2 * Math.PI * 58;
  const dashOffset = circumference * (1 - scorePercent / 100);
  const correctCount = questions.filter(
    (q, i) => answers[i] === q.correctOption,
  ).length;
  const wrongCount = questions.filter(
    (q, i) => answers[i] !== undefined && answers[i] !== q.correctOption,
  ).length;
  const skippedCount = questions.filter(
    (_, i) => answers[i] === undefined,
  ).length;
  const answeredCount = questions.length - skippedCount;
  return (
    <div className="result-container">
      {/* ── Score Hero ── */}
      <div className="result-hero">
        {/* SVG Ring */}
        <div className="score-ring-wrapper">
          <svg width="140" height="140">
            <circle
              cx="70"
              cy="70"
              r="58"
              fill="none"
              stroke="#1a2438"
              strokeWidth="10"
            />
            <circle
              cx="70"
              cy="70"
              r="58"
              fill="none"
              stroke={grade.color}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="score-ring-inner">
            <span className="score-ring-percent" style={{ color: grade.color }}>
              {scorePercent}%
            </span>
            <span className="score-ring-grade">{grade.label}</span>
          </div>
        </div>
        {/* Info */}
        <div className="result-hero-info">
          <h2 className="result-hero-title">Quiz Complete</h2>
          <p className="result-hero-sub">
            You scored{" "}
            <strong style={{ color: grade.color }}>{totalPoints}</strong> out of {" "}
            <strong>{maxPoints}</strong> points
          </p>
          <div className="result-stats">
            <Stat
              icon={<BadgeCheck />}
              value={correctCount}
              label="Correct"
              color="#34d399"
            />
            <Stat
              icon={<BadgeX size={20} />}
              value={wrongCount}
              label="Wrong"
              color="#f87171"
            />
            <Stat
              icon={<BadgeMinus size={20} />}
              value={skippedCount}
              label="Skipped"
              color="#64748b"
            />
            <Stat
              icon={<BadgeQuestionMark size={20} />}
              value={answeredCount}
              label="Answered"
              color="#38bdf8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FinalResultBanner;
