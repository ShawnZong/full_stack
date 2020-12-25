import React, { useEffect, useState } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;
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
const ShowCountryDetail = ({ country, weather }) => {
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
      <img src={country.flag} alt={country.name} width="200" height="100" />
      <h2>Weather in {country.capital}</h2>
      <p><strong>temperature:</strong>{weather.current.temperature} Celcius</p>

      <img
        src={weather.current.weather_icons[0]}
        alt={weather.current.weather_descriptions[0]}
      />
      <p>
        <strong>wind:</strong>
        {weather.current.wind_speed} mph direction SSW
      </p>
    </div>
  );
};
const ViewButton = ({ index, viewStates, setViewStates, country, weather }) => {
  const handleViewButton = () => {
    const tmp = [...viewStates];
    tmp[index] = !tmp[index];
    setViewStates(tmp);
  };
  if (viewStates[index]) {
    return (
      <div>
        <button onClick={handleViewButton}>hide</button>
        <ShowCountryDetail country={country} weather={weather} />
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
const ShowCountries = (
  { countries, viewStates, setViewStates, weathers },
) => {
  console.log(weathers);
  if (countries.length === 1) {
    return (
      <ShowCountryDetail country={countries[0]} weather={weathers[0]} />
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
                weather={weathers[index]}
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
  const [weathers, setWeathers] = useState([]);

  useEffect(() => {
    if (searchName !== "") {
      const searchURL = `https://restcountries.eu/rest/v2/name/${searchName}`;
      axios
        .get(searchURL)
        .then((response) => {
          setCountries(response.data);
          console.log("country", response.data);
          console.log("data length", response.data.length);
          if (response.data.length <= 10) {
            setViewStates(new Array(response.data.length).fill(false));

            setWeathers(new Array(response.data.length).fill({}));
            let weatherURL = "";
            const weatherTmp = [];
            response.data.forEach((country) => {
              console.log("enter foreach");
              weatherURL =
                `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
              axios
                .get(weatherURL)
                .then((response) => {
                  weatherTmp.push(JSON.parse(JSON.stringify(response.data)));
                  // weatherTmp.push(JSON.parse(JSON.stringify(response.data)));
                })
                .catch((error) => console.log(error));
            });
            console.log("weathertmp", weatherTmp);
            setWeathers(weatherTmp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchName]);

  // useEffect(() => {
  //   if (countries.length > 0 && countries.length <= 10) {
  //     setWeathers(new Array(countries.length).fill({}));
  //     let weatherURL = "";
  //     const weatherTmp = [];

  //     countries.forEach((country) => {
  //       weatherURL =
  //         `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
  //       axios
  //         .get(weatherURL)
  //         .then((response) => {
  //           weatherTmp.push(JSON.parse(JSON.stringify(response.data)));
  //           // weatherTmp.push(JSON.parse(JSON.stringify(response.data)));
  //         })
  //         .catch((error) => console.log(error));
  //     });
  //     console.log("weathertmp", weatherTmp);
  //     setWeathers(weatherTmp);
  //   }
  // }, [countries]);
  console.log("countries", countries);
  console.log("weathers", weathers);
  if (countries.length > 0) {
    return (
      <div>
        <Filter setSearchName={setSearchName} />
        <ShowCountries
          countries={countries}
          viewStates={viewStates}
          setViewStates={setViewStates}
          weathers={weathers}
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
