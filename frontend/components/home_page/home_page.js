import React from 'react';

class HomePage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { search: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.setupd3 = this.setupd3.bind(this);
  }

  componentDidMount() {
    this.setupd3()
  }

  searchAddress() {
    const geocoder = new google.maps.Geocoder();
    const address = this.state.search;
    geocoder.geocode({ address }, this.handleResponse);
  }

  handleResponse(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      const lat = results[0].geometry.location.lat();
      const long = results[0].geometry.location.lng();
      console.log(lat, long);
      this.fetchWeather(lat, long);
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

  handleSubmit(e) {
    e.preventDefault();
    this.searchAddress();
    this.setState({ search: "" });
  }
  setupd3() {
    const data = [
      {"date": 1, "close":20},
      {"date": 2, "close":30},
      {"date": 3, "close":40},
      {"date": 4, "close":50},
      {"date": 5, "close":60}
    ];

    var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var parseTime = d3.timeParse("%d-%b-%y");

      var x = d3.scaleTime()
        .rangeRound([0, width]);

      var y = d3.scaleLinear()
        .rangeRound([height, 0]);

      var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.close; }));

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

        g.append("g")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Price ($)");

          g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line);
  }
    // const addressInput = document.getElementById('address-input').value;
    // const geocoder = new google.maps.Geocoder();

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text"
          onChange={this.update("search")}
          value={this.state.search}
        />
        </form>
        <section>
          <svg width="960" height="500"></svg>
        </section>
      </div>
    );
  }
}

export default HomePage;
