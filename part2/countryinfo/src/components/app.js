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
const ShowWeather = ({ capital, weather }) => {
  if (!weather) {
    return null;
  }
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><strong>temperature:</strong>{weather.temperature} Celcius</p>

      <img
        src={weather.weather_icons[0]}
        alt={weather.weather_descriptions[0]}
      />
      <p>
        <strong>wind:</strong>
        {weather.wind_speed} mph direction SSW
      </p>
    </div>
  );
};
const ShowCountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;
  const url =
    `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
  useEffect(() => {
    axios.get(url).then((response) => {
      setWeather(response.data.current);
    });
  }, [url]);
  // debugger;
  return (
    <div>
      <h2>{country.name}</h2>

      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((lang) =>
          <li key={lang.iso639_2}>
            {lang.name}
          </li>
        )}
      </ul>
      <div>
        <img src={country.flag} height="80px" alt="flag" />
      </div>
      <ShowWeather capital={country.capital} weather={weather} />
    </div>
  );
};

const ShowCountryName = ({ country }) => <p>{country.name}</p>;

const ViewButton = ({ index, country, setSearchName }) => {
  const handleViewButton = () => {
    setSearchName(country.name);
  };

  return (
    <div>
      <button onClick={handleViewButton}>show</button>
    </div>
  );
};
const ShowCountries = (
  { countries, setSearchName },
) => {
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
                country={country}
                setSearchName={setSearchName}
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
  const [searchName, setSearchName] = useState("swi");
  // const [viewStates, setViewStates] = useState([]);
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
        <ShowCountries
          countries={countries}
          setSearchName={setSearchName}
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
