import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setPhone] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.includes(persons.find((person) => person.name === newName))) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newObj = { name: newName, phone: newPhone };
      setPersons(persons.concat(newObj));
    }
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
          number:<input
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) =>
          <li key={person.name}>{person.name} {person.phone}</li>
        )}
      </ul>
    </div>
  );
};

export default App;
