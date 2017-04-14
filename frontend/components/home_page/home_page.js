import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import moment from 'moment';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { current: "", historic: "", date: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchSearches();
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.currentUser) {
      if (this.props.currentUser !== nextProps.currentUser) {
        this.props.fetchSearches();
      }
    }
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  getWeatherByGeocode(search) {
    const geocode = { lat: search.lat, lng: search.long, address: search.location};
    this.props.fetchWeather(geocode).then(action => {
      this.props.setLoadingState(false);
      hashHistory.push(`current/${search.location}`);
    });
  }

  handleSubmit(locationType) {
    return (e) => {
      e.preventDefault();
      const search_params = this.setSearchParams(locationType);
      if (this.blankField(locationType)) return this.setupErrors(locationType);
      this.props.setLoadingState(true);
      this.props.fetchGeocode(search_params).then(action => {
        hashHistory.push(`${locationType}/${search_params.address}`);
      });
    };
  }
  setupErrors(locationType) {
    this.props.createErrors(["Please fill out required fields"]);
  }

  blankField(locationType) {
    if (locationType === "historic") {
      if (this.state[locationType] === "" || this.state.date === "") {
        return true;
      }
    } else {
      return this.state[locationType] === "";
    }
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
    const creationDate = moment(search.created_at).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <li key={search.created_at}
        className="flex search-li"
        onClick={() => this.getWeatherByGeocode(search)}
        >
        {/* <div> */}
          <p>{search.location}</p>
          <p>{creationDate}</p>
        {/* </div> */}
        {/* {this.historicDate(search.date)} */}
      </li>
    );
  }
  historicDate(date) {
    if (date) {
      const HistoricDate = moment(parseInt(date * 1000)).format('MMMM Do YYYY');
      return <p>{HistoricDate}</p>;
    }
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
        <div id="search-history" className="form">
          <p>Search History for {this.props.currentUser.username}</p>
          {this.setSearchHistory()}
        </div>
      );
    } else {
      return (
        <div id="search-history" className="form">
          <p>Login to access search history</p>
        </div>
      );
    }
  }
  setMaxDate() {
    const yesterday = moment().subtract(1, 'day');
    return yesterday.format('YYYY-MM-DD');
  }

  setMinDate() {
    const minimum = moment().year(1970).month(0).date(1);
    return minimum.format('YYYY-MM-DD');
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
     (position) => {
       const search = {};
       search.lat = position.coords.latitude;
       search.lng = position.coords.longitude;
       this.props.fetchReverseGeocode(search).then(action => {
         hashHistory.push(`current/current`);
        // } hashHistory.push(`${locationType}/${search_params.address}`);;
      });
     },
     (error) => console.log(JSON.stringify(error)),
     {enableHighAccuracy: true, timeout: 7000, maximumAge: 1000}
   );
  }


  render() {
    const errors = this.props.errors.map((err, idx) => (
      <li key={idx} id="errors">{err}</li>
    ));
    return (
      <section className="form-container">
        <div className="form height-set">
          <button onClick={this.getLocation}>Location</button>
          <form onSubmit={this.handleSubmit("current")}>
            <p>Find the current weather for:</p>
          <input type="text"
            onChange={this.update("current")}
            value={this.state.current}
            placeholder="Location"
          />
          <input
            type="submit"
            value="Search Current Weather"
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
          onChange={this.update("date")}
          min={this.setMinDate()}
          max={this.setMaxDate()}/>
          <input
            type="submit"
            value="Historic Search"
            className="submit-button"
          />
          </form>
          { errors }
        </div>
        {this.showSearchHistory()}
      </section>
    );
  }
}

export default HomePage;
