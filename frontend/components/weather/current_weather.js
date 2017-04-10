import React from 'react';
import graphWeather from './graph_weather';
import { hashHistory } from 'react-router';

class CurrentWeather extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.weather.hourly) {
      graphWeather(this.props.weather.hourly.data);
    }
  }

  componentDidMount() {
    if (!this.props.weather.hourly) {
      hashHistory.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUser) {
      const lat = this.props.weather.latitude;
      const long = this.props.weather.longitude;
      const location = this.props.weather.location;
      this.props.createSearch({ lat, long, location});
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

  renderHistoric() {
    let date = this.props.weather.currently.time;
    date = new Date(date * 1000).toDateString();
    return (
      <div className="centered">
        <h1>{this.props.weather.location} on {date}</h1>
        <svg width={this.props.width} height={this.props.height}></svg>
      </div>
    );
  }

  render() {
    if (this.props.weather.currently === undefined) return null;
    if (this.props.location.includes("historic")) return this.renderHistoric();

    return (
      <div className="centered">
        <h1>{this.props.weather.location}</h1>
        <svg width={this.props.width} height={this.props.height}></svg>
        <section className="week-container">
          {this.weatherSummary("currently")}
          {this.weatherWeek()}
        </section>
      </div>
    );
  }

}

export default CurrentWeather;
