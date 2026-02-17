import React, { useState } from 'react';
import { fetchCurrentWeather } from './api';
import { CITIES } from './cities';

const DEFAULT_CITY = 'Bangalore';

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [customCity, setCustomCity] = useState('');
  const [units, setUnits] = useState('metric');

  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedCity = city === '__custom__' ? customCity.trim() : city;

  const handleFetchCurrent = async () => {
    if (!selectedCity) {
      setError('Please select or enter a city');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const data = await fetchCurrentWeather(selectedCity, units);
      setCurrentWeather(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch current weather');
    } finally {
      setLoading(false);
    }
  };

  const unitLabel = units === 'metric' ? '°C' : '°F';

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p>Current weather for cities around the world.</p>
      </header>

      <section className="controls">
        <div className="field city-field">
          <label htmlFor="city">City</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <optgroup label="Popular cities">
              {CITIES.map((c) => (
                <option key={`${c.name}-${c.country}`} value={c.name}>
                  {c.name}, {c.country}
                </option>
              ))}
            </optgroup>
            <option value="__custom__">— Other (type below) —</option>
          </select>
          {city === '__custom__' && (
            <input
              type="text"
              className="custom-city-input"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              placeholder="Enter city name"
            />
          )}
        </div>
        <div className="field">
          <label>Units</label>
          <div className="segmented">
            <button
              type="button"
              className={units === 'metric' ? 'active' : ''}
              onClick={() => setUnits('metric')}
            >
              Metric (°C)
            </button>
            <button
              type="button"
              className={units === 'imperial' ? 'active' : ''}
              onClick={() => setUnits('imperial')}
            >
              Imperial (°F)
            </button>
          </div>
        </div>
        <div className="actions">
          <button type="button" onClick={handleFetchCurrent}>
            Get Weather
          </button>
        </div>
      </section>

      {loading && <div className="status">Loading...</div>}
      {error && <div className="status error">{error}</div>}

      <main className="content">
        {currentWeather && (
          <section className="card">
            <h2>
              {currentWeather.location?.name}, {currentWeather.location?.country}
            </h2>
            {currentWeather.current?.weather_icons?.[0] && (
              <img
                src={currentWeather.current.weather_icons[0]}
                alt=""
                className="weather-icon"
              />
            )}
            <p className="temperature">
              {currentWeather.current?.temperature}
              {unitLabel}
            </p>
            <p className="description">
              {currentWeather.current?.weather_descriptions?.[0]}
            </p>
            <div className="meta">
              <span>Feels like: {currentWeather.current?.feelslike}{unitLabel}</span>
              <span>Humidity: {currentWeather.current?.humidity}%</span>
              <span>Wind: {currentWeather.current?.wind_speed} {units === 'metric' ? 'km/h' : 'mph'}</span>
              <span>Pressure: {currentWeather.current?.pressure} mb</span>
              <span>UV Index: {currentWeather.current?.uv_index}</span>
              <span>Visibility: {currentWeather.current?.visibility} km</span>
            </div>
            {currentWeather.current?.astro && (
              <div className="meta astro">
                <span>Sunrise: {currentWeather.current.astro.sunrise}</span>
                <span>Sunset: {currentWeather.current.astro.sunset}</span>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
