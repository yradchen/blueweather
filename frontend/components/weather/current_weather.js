import React from 'react';


class CurrentWeather extends React.Component {
  constructor (props) {
    super(props);
  }

  weatherSummary(date) {
    return this.props.weather[date].summary;
  }

  render() {
    if (this.props.weather.currently === undefined) return null;
    return (
      <div>
        <p>Current Summary: {this.weatherSummary("currently")}</p>
        <p>Week Summary: {this.weatherSummary("daily")}</p>
      </div>
    );
  }

}

export default CurrentWeather;
