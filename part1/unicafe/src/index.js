import React, { useState } from "react";
import ReactDOM from "react-dom";
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;
  let average = 0;
  let positive = 0;
  if (all !== 0) {
    average = (good - bad) / all;
    positive = (good) / all;
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={() => {
          setGood(good + 1);
        }}
        text="good"
      />
      <Button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
        text="neutral"
      />
      <Button
        onClick={() => {
          setBad(bad + 1);
        }}
        text="bad"
      />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>potitive {positive} %</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
