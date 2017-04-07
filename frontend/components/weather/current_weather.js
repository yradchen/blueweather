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

  setWeatherImage(string) {
    const imageName = string.split("-").join("");
    return <img src={images[imageName]} />;
  }
  weatherSummary(time) {
    const weather = this.props.weather[time];
    const date = new Date(weather.time * 1000).toDateString();

    return (
      <div className="daily-weather">
        <p className="date">{date}</p>
        <p className="summary">{weather.summary}</p>
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
          <p className="date">{date}</p>
          <p className="summary">{datum.summary}</p>
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
    debugger
    return (
      <div className="centered">
        <h1>{this.props.location}</h1>
        <svg width="960" height="400"></svg>
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
