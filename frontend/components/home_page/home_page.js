import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import moment from 'moment';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { currentLocation: "", historicLocation : "", date: "" };
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
    let date;
    if (locationType === "historicLocation") {
      date = new Date(this.state.date).getTime() / 1000;
    }
    this.props.createSearch( { search: { lat, long, location } } );
    this.props.fetchWeather(lat, long, date).then(
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

  searchLi(search) {
    const date = moment(search.created_at).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <li key={search.created_at}
        className="flex search-li"
        onClick={() => this.fetchWeather(search.lat, search.long, search.location, "currentLocation")}
        >
        <p>{search.location}</p>
        <p>{date}</p>
      </li>
    );
  }

  search(lat, long, location) {
    return (e) => {
      let date;
      this.props.createSearch( { search: { lat, long, location } } );
      this.props.fetchWeather(lat, long, date).then(
        hashHistory.push(`${url}/${location}`)
      );
    };
  }

  setSearchHistory() {
    const searches = this.props.searches.map(search => {
      return this.searchLi(search);
    });
    return (
      <ul>
        {searches}
      </ul>
    );
  }
  createSearch() {
    
    if (this.props.currentUser) {
      return (
        <div id="search-history" className="form">
          <p>Search History for {this.props.currentUser.username}</p>
          {this.setSearchHistory()}
        </div>
      );
    }
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
          <input
            type="submit"
            value="Search Today"
            className="submit-button"
          />
          </form>
          <form onSubmit={this.handleSubmit("historicLocation")}>
            <p>Enter a date and location for historic weather</p>
          <input type="text"
            onChange={this.update("historicLocation")}
            value={this.state.historicLocation}
            placeholder="Location"
          />
          <input type="date"
          onChange={this.update("date")}/>
          </form>
          <input
            type="submit"
            value="Historic Search"
            className="submit-button"
          />
        </div>
        {this.createSearch()}

      </section>
    );
  }
}

export default HomePage;
