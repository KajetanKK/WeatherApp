import React, {useState} from "react";

const api = {
  key: "eab6b66a103a129d1cde17395c84850d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setquery] = useState('');
  const [weather, setweather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setweather(result)
        setquery('')
      });
    }
  }

  const dateHandle = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Wyszukaj..."
            onChange={e => setquery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (

        <div>
          <div className="location">
          <div className="place">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateHandle(new Date())}</div>
        </div>

        <div className="weather">
          <div className="temp">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="currentWeather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('') }
      </main>
    </div>
  );
}

export default App;
