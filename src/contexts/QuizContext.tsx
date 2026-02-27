import React, { useEffect, useReducer } from "react";
import type { QuestionType } from "../components/question/Question.type";
import type { Status } from "../types/Status.types";

const COUNTDOWN = null;

type QuizContextType = {
  questions: QuestionType[];
  status: Status;
  index: number;
  answers: (number | undefined)[];
  remaningTime: number | null;
  numQuestions: number;
  answeredCount: number;
  totalPoints: number;
  possiblePoints: number;
  dispatch: React.ActionDispatch<[action: Action]>;
};

const QuizContext = React.createContext<QuizContextType>({
  questions: [],
  status: "loading",
  index: 0,
  answers: [],
  remaningTime: null,
  numQuestions: 0,
  answeredCount: 0,
  totalPoints: 0,
  possiblePoints: 0,
  dispatch: () => {},
});

export type InitialState = {
  questions: QuestionType[];
  status: Status;
  index: number;
  answers: (number | undefined)[];
  point: number;
  remaningTime: number | null;
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
  remaningTime: COUNTDOWN ?? null,
};
function reducer(state: InitialState, action: Action): InitialState {
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
        remaningTime: state.remaningTime ? state.remaningTime - 1 : null,
        status: state.remaningTime === 0 ? "finished" : state.status,
      };
    }

    default:
      throw Error();
  }
}

const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ status, questions, index, answers, remaningTime }, dispatch] =
    useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const answeredCount = answers.filter((a) => a !== undefined).length;

  const totalPoints = questions.reduce((acc, question, i) => {
    if (answers[i] === question.correctOption) {
      return acc + question.points;
    }
    return acc;
  }, 0);
  const possiblePoints = questions.reduce((a, q) => a + q.points, 0);

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
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answers,
        remaningTime,
        numQuestions,
        answeredCount,
        totalPoints,
        possiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizContextProvider };
