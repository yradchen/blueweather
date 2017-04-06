import React from 'react';
import graphWeather from './graph_weather';

class CurrentWeather extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.weather.hourly) {
      graphWeather(this.props.weather.hourly.data);
    }
  }
  // <img src={images.cloudy}/>
  setWeatherImage(string) {
    const imageName = string.split("-").join("");
    return <img src={images[imageName]} />;
  }
  weatherSummary(date) {
    const weather = this.props.weather[date];

    return (
      <div className="current-weather">
        <p>Today</p>
        <p>{weather.summary}</p>
        {this.setWeatherImage(weather.icon)}
        <p>Current Temp: {weather.temperature}</p>
        <p>Chance of Precipitation: {Math.round(weather.precipProbability * 100)}%</p>
      </div>
    );
  }

  weatherWeek() {
    const dailyWeather = this.props.weather.daily.data.slice(1);
    return dailyWeather.map(datum  => {
      const date = new Date(datum.time * 1000).toDateString();

      return (
        <div key={date} className="daily-weather">
          <p>{date}</p>
          <p>{datum.summary}</p>
          {this.setWeatherImage(datum.icon)}
          <p>Min Temp: {datum.temperatureMin}</p>
          <p>Max Temp: {datum.temperatureMax}</p>
          <p>Chance of Percipitation: {Math.round(datum.precipProbability * 100)}%</p>
        </div>
      );
    });
  }

  render() {
    if (this.props.weather.currently === undefined) return null;

    return (
      <div>
        <svg width="960" height="500"></svg>
        <section className="week-container">
          {this.weatherSummary("currently")}
          {this.weatherWeek()}
        </section>
      </div>
    );
  }

}

export default CurrentWeather;

// this.props.weather.currently.temperature
// this.props.weather.currently.icon
// this.props.weather.currently.precipProbability - chance of rain
// this.props.weather.currently.time
