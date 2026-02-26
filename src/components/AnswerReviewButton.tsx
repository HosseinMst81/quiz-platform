import React from "react";

function AnswerReviewButton({
  setShowAnswerReview,
  showAnswerReview,
}: {
  setShowAnswerReview: React.Dispatch<React.SetStateAction<boolean>>;
  showAnswerReview: boolean;
}) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => setShowAnswerReview(!showAnswerReview)}
    >
      {showAnswerReview ? "Hide Answer Review" : "Show Answer Review"}
    </button>
  );
}

export default AnswerReviewButton;
