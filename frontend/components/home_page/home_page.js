import React from 'react';
import { Link, hashHistory, withRouter } from 'react-router';
import moment from 'moment';
import CurrentLocation from './current_location';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { current: "", historic: "", date: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.getLocation = this.getLocation.bind(this);
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
  checkSearchType(search) {
    const geocode = { lat: search.lat, lng: search.long, address: search.location};
    if (search.date) {
      geocode.date = search.date;
      this.getWeatherByGeocode(geocode, "historic");
    } else {
      this.getWeatherByGeocode(geocode, "current");
    }
  }

  getWeatherByGeocode(geocode, date) {
    this.props.fetchWeather(geocode).then(action => {
      this.props.setLoadingState(false);
      hashHistory.push(`${date}/${geocode.address}`);
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
    let searchDate;
    if (search.date) {
      searchDate = moment(parseInt(search.date)).format('MMMM Do YYYY, h:mm:ss');
      searchDate = `Historic Date: ${searchDate}`;
    }

    return (
      <li key={search.created_at}
        className="flex search-li"
        onClick={() => this.checkSearchType(search)}
        >
        <div>
          <p>{search.location}</p>
          <p>{searchDate}</p>
        </div>
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
          <p>Search history for {this.props.currentUser.username}</p>
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

  containerType() {
    if (this.props.currentUser) {
      return "row-reverse";
    } else {
      return "column";
    }
  }

  render() {
    const errors = this.props.errors.map((err, idx) => (
      <li key={idx} className="errors">{err}</li>
    ));
    return (
      <section className={`form-container ${this.containerType()}`}>
        {this.showSearchHistory()}
        <div className="form set-height">
          <CurrentLocation
            fetchReverseGeocode={this.props.fetchReverseGeocode}
            setLoadingState={this.props.setLoadingState}
            createErrors={this.props.createErrors}
          />
          <form onSubmit={this.handleSubmit("current")}>
            { errors }
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
        </div>
      </section>
    );
  }
}

export default HomePage;
