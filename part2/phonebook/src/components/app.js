import React, { useEffect, useState } from "react";
import axios from "axios";
import personServices from "../services/persons.js";
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
      personServices
        .create(newObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        });
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
const DeletePerson = ({ person, persons, setPersons }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServices.deletePerson(person.id);
      setPersons(persons.filter((tmp) => tmp.id !== person.id));
    }
  };
  return (
    <button onClick={handleDelete}>delete</button>
  );
};
const ShowPersons = ({ searchName, persons, setPersons }) => {
  const newPersons = persons.filter((person) => {
    if (person.name.toLocaleLowerCase().includes(searchName)) {
      return true;
    }
    return false;
  });

  return (<div>
    <ul>
      {newPersons.map((person) => {
        return (
          <li key={person.name}>
            {person.name}
            {" "}
            {person.phone}
            {" "}
            <DeletePerson
              person={person}
              persons={persons}
              setPersons={setPersons}
            />
          </li>
        );
      })}
    </ul>
  </div>);
};
const App = () => {
  const [persons, setPersons] = useState(
    [],
  );
  const [newName, setNewName] = useState("");
  const [newPhone, setPhone] = useState("");
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      });
  }, []);
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
      <ShowPersons
        searchName={searchName}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
