const searchAddress = () => {
  const addressInput = document.getElementById('address-input').value;
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: addressInput}, handleResponse);
};

const handleResponse = (results, status) => {
  if (status === google.maps.GeocoderStatus.OK) {
    const lat = results[0].geometry.location.lat();
    const long = results[0].geometry.location.lng();
    console.log(lat, long);
    console.log(fetchWeather(lat, long));
  } else {
    console.log("failure");
  }
};
// https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589
const fetchWeather = (lat, long) => {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  const baseUrl = 'https://api.darksky.net/forecast/';

  const url = `${baseUrl}${key}/${lat},${long}`;
  // const url = baseUrl + key + "/" + lat  + "," + long;
  return $.ajax({
    method: 'GET',
    url: proxy + url
    // data: { key: "a1128933917a7ea6a865e98d86ac16b2", latitude: 37.8267, longitude: -122.4233 }
  }).then(data => {

  });
};
// fetchWeather();

// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
//
// GET
