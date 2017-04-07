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

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchSearches();
    }
  }

  searchAddress(locationType) {
    const geocoder = new google.maps.Geocoder();
    const address = this.state[locationType];
    geocoder.geocode({ address }, this.handleResponse(locationType));
  }

  handleResponse(locationType) {
    return (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {

        const location = results[0].formatted_address;

        const lat = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        this.fetchWeather(lat, long, location, locationType);
      } else {
        console.log("failure");
      }
    };
  }

  fetchWeather (lat, long, location, locationType) {
    const url = locationType === "currentLocation" ? "current" : "historic";
    this.props.createSearch( { search: { lat, long, location } } );
    this.props.fetchWeather(lat, long).then(
      hashHistory.push(`${url}/${location}`)
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
      <section className="form-container">
        <div className="form">
          <form onSubmit={this.handleSubmit("currentLocation")}>
            <p>Find the current weather for:</p>
          <input type="text"
            onChange={this.update("currentLocation")}
            value={this.state.currentLocation}
            placeholder="Location"
          />

          </form>
          <form onSubmit={this.handleSubmit("historicLocation")}>
            <p>Enter a date and location for historic weather</p>
          <input type="text"
            onChange={this.update("historicLocation")}
            value={this.state.historicLocation}
            placeholder="Location"
          />
          <input type="date" />
          </form>

        </div>
      </section>
    );
  }
}

export default HomePage;
