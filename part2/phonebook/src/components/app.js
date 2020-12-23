import React, { useState } from "react";
const Filter = ({ setSearchName }) => {
  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };
  return (
    <div>
      filter shown with
      <input
        onChange={handleSearch}
      />
    </div>
  );
};
const PersonForm = (
  { persons, setPersons, newName, setNewName, newPhone, setPhone },
) => {
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
  );
};
const Persons = ({ searchName, persons }) => {
  const newPersons = persons.filter((person) => {
    if (person.name.toLocaleLowerCase().includes(searchName)) {
      return true;
    }
    return false;
  });

  return (<div>
    <ul>
      {newPersons.map((person) =>
        <li key={person.name}>{person.name} {person.phone}</li>
      )}
    </ul>
  </div>);
};
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchName={setSearchName} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        newPhone={newPhone}
        setNewName={setNewName}
        setPhone={setPhone}
      />
      <h2>Numbers</h2>
      <Persons searchName={searchName} persons={persons} />
    </div>
  );
};

export default App;
