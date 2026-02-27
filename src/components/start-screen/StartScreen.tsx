import {
  ArrowLeftRight,
  ArrowRight,
  CircleQuestionMark,
  ClipboardClock,
  Flag,
  LucideTrophy,
  TrendingUp,
} from "lucide-react";
import { useQuiz } from "../../hooks/useQuize";
import "./StartScreen.css";

type StartScreenProps = {
  topics?: string[];
  timeLimit?: string;
};

const DEFAULT_TOPICS = [
  "Hooks & State",
  "Component Lifecycle",
  "Performance",
  "Context & Refs",
];

function StartScreen({ topics = DEFAULT_TOPICS, timeLimit }: StartScreenProps) {
  const { numQuestions, possiblePoints, dispatch } = useQuiz();
  
  return (
    <div className={`start-screen--ready`}>
      {/* Ambient glow */}
      <div className="start-glow" aria-hidden />

      {/* Badge */}
      <div className="start-badge">
        <span className="start-badge-dot" />
        React Mastery Quiz
      </div>

      {/* Headline */}
      <h1 className="start-headline">
        Test Your
        <br />
        <span className="start-headline-accent">React Knowledge</span>
      </h1>

      <p className="start-description">
        A curated set of questions covering core React concepts. Read each
        question carefully — you can navigate back and forth before submitting.
      </p>

      {/* Stats row */}
      <div className="start-stats">
        <StatCard
          icon={<CircleQuestionMark />}
          value={String(numQuestions)}
          label="Questions"
        />
        <StatCard
          icon={<LucideTrophy />}
          value={String(possiblePoints)}
          label="Total Points"
        />
        {timeLimit && (
          <StatCard
            icon={<ClipboardClock />}
            value={timeLimit}
            label="Duration"
            dim={!timeLimit}
          />
        )}
      </div>

      {/* Topics */}
      <div className="start-topics">
        <span className="start-topics-label">Covers</span>
        <div className="start-topics-list">
          {topics.map((t) => (
            <span key={t} className="start-topic-chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Rules */}
      <ul className="start-rules">
        <li>
          {<ArrowLeftRight />}
          Navigate freely between questions before finishing
        </li>
        <li>
          {<Flag />}
          You'll be asked to confirm before submitting
        </li>
        <li>
          {<TrendingUp />}
          Results and correct answers revealed after submission
        </li>
      </ul>

      {/* CTA */}
      <button
        className="start-btn"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        <span>Start Quiz</span>
        <ArrowRight />
      </button>

      {timeLimit && (
        <p className="start-footnote">Timer starts once you press Begin</p>
      )}
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  dim = false,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  dim?: boolean;
}) {
  return (
    <div className={`start-stat-card ${dim ? "start-stat-card--dim" : ""}`}>
      <span className="start-stat-icon" aria-hidden>
        {icon}
      </span>
      <span className="start-stat-value">{value}</span>
      <span className="start-stat-label">{label}</span>
    </div>
  );
}

export default StartScreen;
