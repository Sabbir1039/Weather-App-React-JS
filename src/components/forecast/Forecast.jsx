import "./Forecast.css"

const Forecast = ( {data} ) => {
    const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return(
        <>
            <h2 className="forecast-title">Forecast</h2>
            <div className="forecast-data">
                {data.list.slice(0, 7).map((item, idx) => (
                    <div key={idx} className="daily-item">
                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                    <p className="day">{forecastDays[idx]}</p>
                    <p className="description">{item.weather[0].description}</p>
                    <p className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</p>
                    </div>
                ))}
            </div>
        </>
        
    );
};

export default Forecast;