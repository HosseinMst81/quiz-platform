import { useEffect } from "react";
import { useQuiz } from "../../hooks/useQuize";
import displayTime from "../../utils/displayTime";
import "./Timer.css";

function Timer() {
  const { dispatch, remaningTime } = useQuiz();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return function () {
      clearInterval(interval);
    };
  }, [dispatch]);

  if (!remaningTime) return null;
  return <div className="timer">{displayTime(remaningTime)}</div>;
}

export default Timer;
