import { TriangleAlert } from "lucide-react";
import "./FinishConfirmModal.css";
import { useEffect, useState } from "react";
import { useQuiz } from "../../hooks/useQuize";

type FinishConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

function FinishConfirmModal({ onConfirm, onCancel }: FinishConfirmModalProps) {
  const { answeredCount, numQuestions } = useQuiz();
  const [visible, setVisible] = useState(false);
  const skipped = numQuestions - answeredCount;

  useEffect(() => {
    // Trigger entrance animation on mount
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  function handleConfirm() {
    setVisible(false);
    setTimeout(onConfirm, 300);
  }

  function handleCancel() {
    setVisible(false);
    setTimeout(onCancel, 300);
  }

  return (
    <div
      className={`modal-backdrop ${visible ? "modal-backdrop--visible" : ""}`}
      onClick={handleCancel}
    >
      <div
        className={`modal-card ${visible ? "modal-card--visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="modal-icon-wrapper">
          <div className="modal-icon-ring" />
          <span className="modal-icon">⚠</span>
        </div>

        {/* Text */}
        <h2 className="modal-title">Submit Quiz?</h2>
        <p className="modal-subtitle">
          You're about to finish. This cannot be undone.
        </p>

        {/* Stats summary */}
        <div className="modal-stats">
          <div className="modal-stat modal-stat--answered">
            <span className="modal-stat-value">{answeredCount}</span>
            <span className="modal-stat-label">Answered</span>
          </div>
          <div className="modal-stat-divider" />
          <div className="modal-stat modal-stat--skipped">
            <span className="modal-stat-value">{skipped}</span>
            <span className="modal-stat-label">Skipped</span>
          </div>
          <div className="modal-stat-divider" />
          <div className="modal-stat modal-stat--total">
            <span className="modal-stat-value">{numQuestions}</span>
            <span className="modal-stat-label">Total</span>
          </div>
        </div>

        {skipped > 0 && (
          <div className="modal-warning">
            <TriangleAlert size={15} /> You have {skipped} unanswered{" "}
            {skipped === 1 ? "question" : "questions"}.
            <p>Are You sure about finish?</p>
          </div>
        )}
        {skipped === 0 && (
          <div className="modal-ok">
            <strong>✅ You answerd all of the Questions!</strong>
            <p> Are you sure about finish?</p>
          </div>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button
            className="modal-btn modal-btn--cancel"
            onClick={handleCancel}
          >
            Keep Reviewing
          </button>
          <button
            className="modal-btn modal-btn--confirm"
            onClick={handleConfirm}
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishConfirmModal;
