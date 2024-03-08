import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let intervalId;
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            setFinished(true);
            clearInterval(intervalId);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCountdown(seconds);
    setFinished(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSeconds(parseInt(value));
  };

  const handleReset = () => {
    setSeconds(0);
    setCountdown(0);
    setFinished(false);
  };

  return (
    <div>
      <h1>Simple Countdown Timer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Set time (seconds):
          <input type="number" value={seconds} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Start Countdown</button>
      </form>
      {finished && (
        <div>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
      <h2>{countdown}</h2>
    </div>
  );
}

export default App;
