import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import moment from 'moment';
// import parser from 'parse-address';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { current: "", historic: "", date: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getWeatherByGeocode = this.getWeatherByGeocode.bind(this);
    // this.fetchGeocode = this.props.fetchGeocode.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchSearches();
    }
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  getWeatherByGeocode(search) {
    const geocode = { lat: search.lat, lng: search.long, address: search.location};
    this.props.fetchWeather(geocode).then(action => {
      hashHistory.push(`current/${search.location}`);
    });
  }

  handleSubmit(locationType) {
    return (e) => {
      e.preventDefault();
      const search_params = this.setSearchParams(locationType);
      this.props.fetchGeocode(search_params).then(action => {
        // this.props.createSearch( {})
        hashHistory.push(`${locationType}/${search_params.address}`);
      });
    };
  }

  setSearchParams(locationType) {
    const address = { address: this.state[locationType] };
    if (locationType  === "historic") {
      address.date = this.parseDate();
    }
    return address;
  }

  parseDate() {
    return new Date(this.state.date.replace(/-/g, '\/')).getTime() / 1000;
  }

  searchLi(search) {
    const date = moment(search.created_at).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <li key={search.created_at}
        className="flex search-li"
        onClick={() => this.getWeatherByGeocode(search)}
        >
        <p>{search.location}</p>
        <p>{date}</p>
      </li>
    );
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

  showSearchHistory() {
    if (this.props.currentUser) {
      return (
        <div id="search-history" className="form height-set">
          <p>Search History for {this.props.currentUser.username}</p>
          {this.setSearchHistory()}
        </div>
      );
    }
  }

  render() {
    return (
      <section className="form-container">
        <div className="form height-set">
          <form onSubmit={this.handleSubmit("current")}>
            <p>Find the current weather for:</p>
          <input type="text"
            onChange={this.update("current")}
            value={this.state.current}
            placeholder="Location"
          />
          <input
            type="submit"
            value="Search Today"
            className="submit-button"
          />
          </form>
          <form onSubmit={this.handleSubmit("historic")}>
            <p>Enter a date and location for historic weather</p>
          <input type="text"
            onChange={this.update("historic")}
            value={this.state.historic}
            placeholder="Location"
          />
          <input type="date"
          onChange={this.update("date")}/>
          <input
            type="submit"
            value="Historic Search"
            className="submit-button"
          />
          </form>
        </div>
        {this.showSearchHistory()}
      </section>
    );
  }
}

export default HomePage;
