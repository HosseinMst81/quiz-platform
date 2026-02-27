import React from "react";
import { QuizContext } from "../contexts/QuizContext";

export function useQuiz() {
  const context = React.useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizContextProvider");
  }
  return context;
}