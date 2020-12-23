import React, { useState } from "react";
import ReactDOM from "react-dom";
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);
const Static = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  let average = 0;
  let positive = 0;
  if (all !== 0) {
    average = (good - bad) / all;
    positive = (good) / all * 100 + " %";
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Static text="good" value={good} />
            <Static text="neutral" value={neutral} />
            <Static text="bad" value={bad} />
            <Static text="all" value={all} />
            <Static text="average" value={average} />
            <Static text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
