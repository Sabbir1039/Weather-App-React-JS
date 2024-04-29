
import { useState } from 'react';
import './App.css'
import Search from './components/search/Search';
import WeatherData from './components/weatherData/WeatherData';
import Forecast from './components/forecast/Forecast';
import { weather_api_url, weather_api_key } from './api/api';

function App() {

  const [waether, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchChange = (searchData) => {
     const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);
    const forecastWeatherFetch = fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
    .then(async (response) => {
      const currentWeather = await response[0].json();
      const forecastWeather = await response[1].json();

      setWeather({city: searchData.label, ...currentWeather});
      setForecast({city: searchData.label, ...forecastWeather});
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <>
      <div className='main-app'>
        <Search onSearchChange={ handleSearchChange }/>
        { waether && <WeatherData data={waether}/> }
        { forecast && <Forecast data={forecast}/> }
      </div>
      
    </>
  )
}

export default App
