import React from 'react';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { currentLocation: "", historicLocation : "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  searchAddress(locationType) {
    const geocoder = new google.maps.Geocoder();
    const address = this.state[locationType];
    geocoder.geocode({ address }, this.handleResponse);
  }

  handleResponse(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      const lat = results[0].geometry.location.lat();
      const long = results[0].geometry.location.lng();
      console.log(lat, long);
      // this.fetchWeather(lat, long);
    } else {
      console.log("failure");
    }
  }

  fetchWeather (lat, long) {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    const baseUrl = 'https://api.darksky.net/forecast/';
    const url = `${baseUrl}${key}/${lat},${long}`;
    return $.ajax({
      method: 'GET',
      url: proxy + url
    }).then(data => {
      console.log(data);
      // get the time, multiply by 1000 and new Date(time) = readable time.
    });
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
          value={this.state.search}
        />
        </form>
        <form onSubmit={this.handleSubmit("historicLocation")}>
          <p>Enter a date and location for historic weather</p>
        <input type="text"
          onChange={this.update("historicLocation")}
          value={this.state.search}
        />
        </form>
      </div>
    );
  }
}

export default HomePage;
