import './Timer.css'
import { useEffect } from "react";
import type { Action } from "../../App";
import displayTime from "../../utils/displayTime";

type TimerProps = {
  dispatch: React.ActionDispatch<[action: Action]>;
  remaningTime: number;
};
function Timer({ dispatch, remaningTime }: TimerProps) {
  const time = displayTime(remaningTime);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return function () {
      clearInterval(interval);
    };
  }, [dispatch]);

  return <div className="timer">{time}</div>;
}

export default Timer;
