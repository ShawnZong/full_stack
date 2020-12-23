import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: "Arto Hellas", number: "040-123456" },
      { name: "Ada Lovelace", number: "39-44-5323523" },
      { name: "Dan Abramov", number: "12-43-234345" },
      { name: "Mary Poppendieck", number: "39-23-6423122" },
    ],
  );
  const [newName, setNewName] = useState("");
  const [newPhone, setPhone] = useState("");
  const [searchName, setSearchName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.includes(persons.find((person) => person.name === newName))) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newObj = { name: newName, phone: newPhone };
      setPersons(persons.concat(newObj));
    }
  };
  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };
  const Show = () => {
    const newPersons = persons.filter((person) => {
      if (person.name.toLocaleLowerCase().includes(searchName)) {
        return true;
      }
      return false;
    });
    return newPersons.map((person) =>
      <li key={person.name}>{person.name} {person.phone}</li>
    );
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input
          onChange={handleSearch}
        />
      </div>
      <h2>add a new</h2>
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
        {Show()}
      </ul>
    </div>
  );
};

export default App;
