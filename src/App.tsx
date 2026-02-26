import { useEffect, useReducer, useState } from "react";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import StartScreen from "./components/start-screen/StartScreen";
import Progress from "./components/progress/Progress";
import QuizCompleteScreen from "./components/quiz-complete-screen/QuizCompleteScreen";
import Timer from "./components/timer/Timer";
import FinalResultBanner from "./components/final-result-banner/FinalResultBanner";
import QuizResult from "./components/quiz-result/QuizResult";
import AnswerKeySidebar from "./components/answer-key-sidebar/AnswerKeySidebar";
import ButtonRestartQuiz from "./components/restart-quiz/ButtonRestartQuiz";
import AnswerReviewButton from "./components/AnswerReviewButton";
import NextButton from "./components/buttons/NextButton";
import PrevButton from "./components/buttons/PrevButton";
import Question from "./components/question/Question";

export interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
}
export type Status = "loading" | "error" | "finished" | "active" | "ready";

const COUNTDOWN = 750;

export type InitialState = {
  questions: QuestionType[];
  status: Status;
  index: number;
  answers: (number | undefined)[];
  point: number;
  remaningTime: number;
};
export type Action =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "startQuiz" }
  | { type: "selectAnswer"; payload?: number }
  | { type: "nextQuestion" }
  | { type: "prevQuestion" }
  | { type: "restartQuiz" }
  | { type: "goToQuestion"; payload: number }
  | { type: "tick" };

const initialState: InitialState = {
  questions: [],
  status: "loading",
  index: 0,
  answers: [],
  point: 0,
  remaningTime: COUNTDOWN,
};

function reducer(state: InitialState, action: Action) : InitialState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        answers: new Array(action.payload.length).fill(undefined),
      };

    case "dataFailed":
      return { ...state, status: "error" };

    case "startQuiz":
      return { ...state, status: "active" };

    case "selectAnswer": {
      const newAnswer = [...state.answers];
      newAnswer[state.index] = action.payload;
      return { ...state, answers: newAnswer };
    }

    case "nextQuestion": {
      if (state.index === state.questions.length - 1) {
        return { ...state, status: "finished" };
      }
      return { ...state, index: state.index + 1 };
    }

    case "prevQuestion": {
      if (state.index === 0) return state;
      return { ...state, index: state.index - 1 };
    }

    case "restartQuiz": {
      return {
        ...state,
        index: 0,
        status: "ready",
        answers: new Array(state.questions.length).fill(undefined),
        remaningTime: COUNTDOWN,
      };
    }

    case "goToQuestion": {
      return { ...state, index: action.payload };
    }

    case "tick": {
      return {
        ...state,
        remaningTime: state.remaningTime - 1,
        status: state.remaningTime === 0 ? "finished" : state.status,
      };
    }

    default:
      throw Error();
  }
}
function App() {
  const [{ status, questions, index, answers, remaningTime }, dispatch] =
    useReducer(reducer, initialState);
  const totalPoints = questions.reduce((acc, question, i) => {
    if (answers[i] === question.correctOption) {
      return acc + question.points;
    }
    return acc;
  }, 0);

  // Controls whether to show the celebration screen or jump straight to results
  const [showCompleteScreen, setShowCompleteScreen] = useState(true);
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const numQuestions = questions.length;
  const answeredCount = answers.filter((a) => a !== undefined).length;

  useEffect(() => {
    async function fetchQuestions() {
      await fetch("http://localhost:3000/questions")
        .then((resp) => resp.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch(() => dispatch({ type: "dataFailed" }))
        .finally();
    }
    fetchQuestions();
  }, []);

  return (
    <div className="page">
      <div className="app">
        <Header />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen
              numQuestions={numQuestions}
              dispatch={dispatch}
              timeLimit={remaningTime}
              possiblePoints={questions.reduce((a, q) => a + q.points, 0)}
              topics={["Hooks", "Context", "Performance", "Refs"]}
            />
          )}

          {status === "active" && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                answered={answeredCount}
              />
              <Question
                answers={answers}
                question={questions[index]}
                index={index}
                dispatch={dispatch}
                status={status}
              />
              <div className="footer">
                {index !== 0 && <PrevButton dispatch={dispatch} />}
                <Timer dispatch={dispatch} remaningTime={remaningTime} />
                {
                  <NextButton
                    status={status}
                    answeredCount={answeredCount}
                    dispatch={dispatch}
                    numQuestions={numQuestions}
                    index={index}
                  />
                }
              </div>
            </>
          )}
          {status === "finished" && showCompleteScreen && (
            <QuizCompleteScreen
              answeredCount={answeredCount}
              totalCount={numQuestions}
              onViewResults={() => setShowCompleteScreen(false)}
            />
          )}
          {status === "finished" && !showCompleteScreen && (
            <>
              <FinalResultBanner
                answers={answers}
                questions={questions}
                totalPoints={totalPoints}
              />

              <Question
                answers={answers}
                question={questions[index]}
                index={index}
                dispatch={dispatch}
                status={status}
              />
              <div className="footer">
                {index !== 0 && <PrevButton dispatch={dispatch} />}
                <AnswerReviewButton
                  setShowAnswerReview={setShowAnswerReview}
                  showAnswerReview={showAnswerReview}
                />
                <NextButton
                  status={status}
                  answeredCount={answeredCount}
                  dispatch={dispatch}
                  numQuestions={numQuestions}
                  index={index}
                />
              </div>

              {showAnswerReview && (
                <QuizResult
                  questions={questions}
                  answers={answers}
                  totalPoints={totalPoints}
                />
              )}
              <ButtonRestartQuiz dispatch={dispatch} />
            </>
          )}
        </Main>
      </div>
      {status === "finished" && !showCompleteScreen && (
        <AnswerKeySidebar
          questions={questions}
          answers={answers}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default App;
