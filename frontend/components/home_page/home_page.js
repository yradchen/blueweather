import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { currentLocation: "", historicLocation : "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.fetchWeather.bind(this);
  }

  searchAddress(locationType) {
    const geocoder = new google.maps.Geocoder();
    const address = this.state[locationType];
    geocoder.geocode({ address }, this.handleResponse(locationType));
  }

  handleResponse(locationType) {
    return (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        
        // location = results[0].formatted_address "New York, NY, USA"
        const lat = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        this.fetchWeather(lat, long, locationType);
      } else {
        console.log("failure");
      }
    };
  }

  fetchWeather (lat, long, locationType) {
    const url = locationType === "currentLocation" ? "current" : "historic";
    this.props.fetchWeather(lat, long).then(
      hashHistory.push(url)
    );
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  handleSubmit(locationType) {
    return (e) => {
      e.preventDefault();
      this.searchAddress(locationType);
      this.setState({ [locationType]: "" });
    };
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit("currentLocation")}>
          <p>Enter a location for current weather</p>
        <input type="text"
          onChange={this.update("currentLocation")}
          value={this.state.currentLocation}
        />

        </form>
        <form onSubmit={this.handleSubmit("historicLocation")}>
          <p>Enter a date and location for historic weather</p>
        <input type="text"
          onChange={this.update("historicLocation")}
          value={this.state.historicLocation}
        />
        </form>
      </div>
    );
  }
}

export default HomePage;
