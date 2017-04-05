import React from 'react';
import graphWeather from './graph_weather';

class CurrentWeather extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    // console.log(graphWeather);
    graphWeather();
  }

  weatherSummary(date) {
    const weather = this.props.weather[date];

    return (
      <div>
        <p>Current Weather</p>
        <p>{weather.summary}</p>
        <p>FUTURE CURRENT WEATHER ICON: {weather.icon}</p>
        <p>Current Temp: {weather.temperature}</p>
        <p>Chance of Precipitation: {weather.precipProbability * 100}%</p>
      </div>
    );
    // currently find temperature
  }

  weatherWeek() {
    const dailyWeather = this.props.weather.daily.data.slice(1);
    return dailyWeather.map(datum  => {
      const date = new Date(datum.time * 1000).toDateString();

      return (
        <div key={date}>
          <p>{date}</p>
          <p>{datum.summary}</p>
          <p>FUTURE IMAGE FOR: {datum.icon}</p>
          <p>Min Temp: {datum.temperatureMin}</p>
          <p>Max Temp: {datum.temperatureMax}</p>
          <p>Chance of {datum.precipType}: {datum.precipProbability * 100}%</p>
        </div>
      );
    });
  }

  render() {
    // if (this.props.weather.currently === undefined) return null;
    return (
      <div>
        <svg width="960" height="500"></svg>
        {/* <section>{this.weatherSummary("currently")}</section> */}

        <section>
          {/* <p>Week Summary: {this.weatherSummary("daily")}</p> */}
          {/* <section>Week Days {this.weatherWeek()}  </section> */}
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
