import React, { useEffect, useState } from "react";
import personServices from "../services/persons.js";
import { Notification } from "./Notification.js";
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
  {
    persons,
    setPersons,
    newName,
    setNewName,
    newNumber,
    setNumber,
    setNotification,
  },
) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const matchedPerson = persons.find((person) => person.name === newName);
    if (persons.includes(matchedPerson)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const newObj = { name: newName, number: newNumber };
        personServices
          .update(matchedPerson.id, newObj)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              ),
            );
            setNotification(
              { message: `Updated ${returnedPerson.name}`, type: "green" },
            );
            setTimeout(() => {
              setNotification(null);
            }, 5000);

            // Notification(`Updated ${returnedPerson.name}`);
          })
          .catch((error) => {
            setNotification(
              {
                message:
                  `Information of ${matchedPerson.name} has already been removed from server`,
                type: "red",
              },
            );
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== matchedPerson.id),
            );
          });
      }
      // window.alert(`${newName} is already added to phonebook`);
    } else {
      const newObj = { name: newName, number: newNumber };
      personServices
        .create(newObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification(
            { message: `Added ${returnedPerson.name}`, type: "green" },
          );
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(
            { message: error.response.data.error, type: "red" },
          );
          setTimeout(() => {
            setNotification(null);
          }, 5000);
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
            setNumber(event.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const DeletePerson = ({ person, persons, setPersons, setNotification }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServices.deletePerson(person.id);
      setPersons(persons.filter((tmp) => tmp.id !== person.id));
      setNotification(
        {
          message: `Deleted ${person.name}`,
          type: "red",
        },
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  return (
    <button onClick={handleDelete}>delete</button>
  );
};
const ShowPersons = ({ searchName, persons, setPersons, setNotification }) => {
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
            {person.number}
            {" "}
            <DeletePerson
              person={person}
              persons={persons}
              setPersons={setPersons}
              setNotification={setNotification}
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
  const [newNumber, setNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    personServices
      .getAll()
      .then((returnedPersons) => {
        setPersons(returnedPersons);
      });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter setSearchName={setSearchName} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNumber={setNumber}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <ShowPersons
        searchName={searchName}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
