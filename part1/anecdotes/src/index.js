import React, { useState } from "react";
import ReactDOM from "react-dom";
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const Anecdote = ({ text, vote }) => {
  return (
    <div>
      <p>
        {text}
      </p>
      <p>
        has {vote} votes
      </p>
    </div>
  );
};
const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const max = Math.max(...votes);
  const increaseVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={increaseVotes} text="vote" />
      <Button
        onClick={() => {
          setSelected(getRandomInt(props.anecdotes.length));
        }}
        text="next anecdote"
      />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[max]} vote={max} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
// const votes = new Array(anecdotes.length).fill(0);
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById("root"),
);
