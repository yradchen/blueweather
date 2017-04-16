import React from 'react';
import { hashHistory } from 'react-router';

class CurrentLocation extends React.Component {
  constructor (props) {
    super(props);
    this.state = { blinkingDisplay: 'hidden', locationDisplay: '', errorMessage: null };
    this.finalLocation = this.finalLocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
  }

  geoSuccess(position) {
    const search = {};
    search.lat = position.coords.latitude;
    search.lng = position.coords.longitude;
    this.props.setLoadingState(true);
    this.props.fetchReverseGeocode(search).then(action => {
      hashHistory.push(`current/current`);
   });
  }

  finalLocation() {
    if (navigator.geolocation) {
      this.toggleSpinner(true);
      navigator.geolocation.getCurrentPosition(
        this.geoSuccess,
        this.geoError,
        this.geoOptions
      );
    } else {
      this.geoError({ code: 4});
    }
  }

  toggleSpinner(boolean) {
    if (boolean) {
      this.setState({ blinkingDisplay: '', locationDisplay: 'hidden'});
    } else {
      this.setState({ blinkingDisplay: 'hidden', locationDisplay: ''});
    }
  }

  geoError(error) {
    this.toggleSpinner(false);
    var errorMessage;
    switch (error.code) {
      case 0:
        errorMessage = 'Sorry, experienced an unknown error';
        break;
      case 1:
        errorMessage = 'Location permission denied. Please check your settings.';
        break;
      case 2:
        errorMessage = 'Position unavailable due to a response error from your location provider';
        break;
      case 3: //timed out
        errorMessage = 'Request for your location timed out. Please try again';
        break;
      case 4:
        errorMessage = 'Geolocation not supported on this browser or device';
        break;
      default:
      errorMessage = 'Oops, something went wrong. Please try again.';
    }
    this.setState({ errorMessage });
  }

  renderError() {
    if (this.state.errorMessage) {
      return <p className="errors">{this.state.errorMessage}</p>;
    }
  }

  geoOptions() {
    return {
      timeout: 5000
    };
    // {, maximumAge: 1000}
  }

// getCurrentPosition takes three arg's. success, error, and options
  render() {

    return (
      <div>
        <p
          className={`blink ${this.state.blinkingDisplay}`}>
          Fetching your location
        </p>
        <button
          onClick={this.finalLocation}
          className={`submit-button fit-form ${this.state.locationDisplay}`}>
          Location
        </button>
        {this.renderError()}
      </div>
    );

  }
}


export default CurrentLocation;
