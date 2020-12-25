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
const ShowCountryName = ({ name }) => <p>{name}</p>;
const ShowCountryDetail = ({ country }) => {
  // debugger;
  // console.log("country and weather in countrydetail", country, weather);
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
      <p>
        <strong>temperature:</strong>
        {country.weather.current.temperature} Celcius
      </p>

      <img
        src={country.weather.current.weather_icons[0]}
        alt={country.weather.current.weather_descriptions[0]}
      />
      <p>
        <strong>wind:</strong>
        {country.weather.current.wind_speed} mph direction SSW
      </p>
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
const ShowCountries = (
  { countries, viewStates, setViewStates, weathers },
) => {
  console.log("countries in showcountries", countries);
  console.log("weathers in showcountries", weathers);
  if (countries.length === 1) {
    return (
      <ShowCountryDetail country={countries[0]} />
      // <ShowCountryDetail country={countries[0]} weather={weathers[0]} />
    );
  } else if (countries.length <= 10) {
    return (
      countries.map(
        (country, index) => {
          return (
            <div key={country.name}>
              <ShowCountryName name={country.name} />
              {/* <ViewButton
                index={index}
                viewStates={viewStates}
                setViewStates={setViewStates}
                country={country}
                weather={weathers[index]}
              /> */}
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
  // const [weathers, setWeathers] = useState([]);

  useEffect(() => {
    console.log("enter useeffect countries");
    let countriesTmp = [];
    if (searchName !== "") {
      const searchURL = `https://restcountries.eu/rest/v2/name/${searchName}`;
      axios
        .get(searchURL)
        .then((response) => {
          // console.log("country", response.data);
          // console.log("data length", response.data.length);
          countriesTmp = response.data;
          console.log(response.data);
          if (response.data.length <= 10) {
            setViewStates(new Array(response.data.length).fill(false));
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (countriesTmp.length <= 10) {
        console.log("enter setweather");
        // setWeathers(new Array(response.data.length).fill({}));
        let weatherURL = "";
        // const weatherTmp = [];
        let weatherTmp;
        countriesTmp.forEach((country, index) => {
          console.log("enter foreach setweather");
          weatherURL =
            `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
          axios
            .get(weatherURL)
            .then((response) => {
              weatherTmp = JSON.stringify(response.data);
              console.log(weatherTmp);
              debugger;
              // weatherTmp.push(JSON.parse(JSON.stringify(response.data)));
              // weatherTmp.push(JSON.parse(JSON.stringify(response.data)));
            })
            .catch((error) => console.log(error));
          debugger;
          countriesTmp[index].weather = JSON.parse(weatherTmp);
        });
      }
    }
    if (countriesTmp !== undefined) {
      setCountries(countriesTmp);
    }
  }, [searchName]);
  // debugger;
  // useEffect(() => {
  //   console.log("enter useeffect weather");
  //   if (countries.length > 0 && countries.length <= 10) {
  //     // setWeathers(new Array(countries.length).fill({}));
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
  //     // console.log("weathertmp", weatherTmp);
  //     setWeathers(weatherTmp);
  //   }
  // }, [countries]);

  // console.log("countries", countries);
  // console.log("weathers", weathers);
  if (countries.length > 0) {
    return (
      <div>
        <Filter setSearchName={setSearchName} />
        <ShowCountries
          // weathers={weathers}
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
