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
const ShowCountries = ({ countries }) => {
  if (countries.length === 1) {
    return (
      <ShowCountryDetail country={countries[0]} />
    );
  } else if (countries.length <= 10) {
    return (
      countries.map(
        (country) => <ShowCountryName key={country.name} country={country} />,
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

  useEffect(() => {
    if (searchName !== "") {
      const searchURL = `https://restcountries.eu/rest/v2/name/${searchName}`;
      axios
        .get(searchURL)
        .then((response) => {
          setCountries(response.data);
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
        <ShowCountries countries={countries} />
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
