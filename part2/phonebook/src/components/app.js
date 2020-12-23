import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
  ]);
  const [newName, setNewName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const newObj = { name: newName };
    setPersons(persons.concat(newObj));
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li>{person.name}</li>)}
      </ul>
      ...
    </div>
  );
};

export default App;
