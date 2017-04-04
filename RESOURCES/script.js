const searchAddress = () => {
  const addressInput = document.getElementById('address-input').value;
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: addressInput}, handleResponse);
};

const handleResponse = (results, status) => {
  if (status === google.maps.GeocoderStatus.OK) {
    const lat = results[0].geometry.location.lat();
    const long = results[0].geometry.location.lng();
    console.log(fetchWeather(lat, long));
  } else {
    console.log("failure");
  }
};

const fetchWeather = (lat, long) => {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  const baseUrl = 'https://api.darksky.net/forecast/';
  const url = `${baseUrl}${key}/${lat},${long}`;
  return $.ajax({
    method: 'GET',
    url: proxy + url
  }).then(data => {

  });
};
