import React, { useEffect, useState } from "react";
import axios from "axios";
const Filter = ({ setSearchName }) => {
  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };
  return (
    <div>
      find countries
      <input
        onChange={handleSearch}
      />
    </div>
  );
};
const ShowCountryName = ({ country }) => <p>{country.name}</p>;
const ShowCountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={country.name} width="500" height="400" />
    </div>
  );
};
const ViewButton = ({ index, viewStates, setViewStates, country }) => {
  const handleViewButton = () => {
    const tmp = [...viewStates];
    tmp[index] = !tmp[index];
    setViewStates(tmp);
  };
  if (viewStates[index]) {
    return (
      <div>
        <button onClick={handleViewButton}>hide</button>
        <ShowCountryDetail country={country} />
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={handleViewButton}>show</button>
      </div>
    );
  }
};
const ShowCountries = ({ countries, viewStates, setViewStates }) => {
  if (countries.length === 1) {
    return (
      <ShowCountryDetail country={countries[0]} />
    );
  } else if (countries.length <= 10) {
    return (
      countries.map(
        (country, index) => {
          return (
            <div key={country.name}>
              <ShowCountryName country={country} />
              <ViewButton
                index={index}
                viewStates={viewStates}
                setViewStates={setViewStates}
                country={country}
              />
            </div>
          );
        },
      )
    );
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
};
const App = () => {
  const [searchName, setSearchName] = useState("");
  const [countries, setCountries] = useState([]);
  const [viewStates, setViewStates] = useState([]);
  useEffect(() => {
    if (searchName !== "") {
      const searchURL = `https://restcountries.eu/rest/v2/name/${searchName}`;
      axios
        .get(searchURL)
        .then((response) => {
          setCountries(response.data);
          setViewStates(new Array(response.data.length).fill(false));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchName]);
  if (countries.length > 0) {
    return (
      <div>
        <Filter setSearchName={setSearchName} />
        <ShowCountries
          countries={countries}
          viewStates={viewStates}
          setViewStates={setViewStates}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Filter setSearchName={setSearchName} />
      </div>
    );
  }
};

export default App;
