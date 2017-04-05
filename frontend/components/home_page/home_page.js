import React from 'react';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { search: "" };
  }
  searchAddress() {
    const geocorder = new google.maps.Geocoder();
    // geocoder.geocode({address: addressInput}, handleResponse);
  }
  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

    // const addressInput = document.getElementById('address-input').value;
    // const geocoder = new google.maps.Geocoder();

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text"
          onChange={this.update("search")}
        />
        </form>
      </div>
    );
  }
}

export default HomePage;
