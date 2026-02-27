import { useState } from "react";
import AnswerKeySidebar from "./components/answer-key-sidebar/AnswerKeySidebar";
import AnswerReviewButton from "./components/AnswerReviewButton";
import NextButton from "./components/buttons/NextButton";
import PrevButton from "./components/buttons/PrevButton";
import Error from "./components/Error";
import FinalResultBanner from "./components/final-result-banner/FinalResultBanner";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Progress from "./components/progress/Progress";
import Question from "./components/question/Question";
import QuizCompleteScreen from "./components/quiz-complete-screen/QuizCompleteScreen";
import QuizResult from "./components/quiz-result/QuizResult";
import ButtonRestartQuiz from "./components/restart-quiz/ButtonRestartQuiz";
import StartScreen from "./components/start-screen/StartScreen";
import Timer from "./components/timer/Timer";
import { useQuiz } from "./hooks/useQuize";
import displayTime from "./utils/displayTime";

function App() {
  const { status, remaningTime } = useQuiz();
  const timeLimit = remaningTime ? displayTime(remaningTime) : undefined;
  // Controls whether to show the celebration screen or jump straight to results
  const [showCompleteScreen, setShowCompleteScreen] = useState(true);
  const [showAnswerReview, setShowAnswerReview] = useState(false);

  return (
    <div className="page">
      <div className="app">
        <Header />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen
              topics={["Hooks", "Context", "Performance", "Refs"]}
              timeLimit={timeLimit}
            />
          )}

          {status === "active" && (
            <>
              <Progress />
              <Question />
              <div className="footer">
                <PrevButton />
                {remaningTime && <Timer />}
                <NextButton />
              </div>
            </>
          )}
          {status === "finished" && showCompleteScreen && (
            <QuizCompleteScreen
              onViewResults={() => setShowCompleteScreen(false)}
            />
          )}
          {status === "finished" && !showCompleteScreen && (
            <>
              <FinalResultBanner />

              <Question />
              <div className="footer">
                <PrevButton />
                <AnswerReviewButton
                  setShowAnswerReview={setShowAnswerReview}
                  showAnswerReview={showAnswerReview}
                />
                <NextButton />
              </div>

              {showAnswerReview && <QuizResult />}
              <ButtonRestartQuiz />
            </>
          )}
        </Main>
      </div>
      {status === "finished" && !showCompleteScreen && <AnswerKeySidebar />}
    </div>
  );
}

export default App;
