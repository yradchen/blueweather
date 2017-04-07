// export const fetchWeather = (lat, long, date) => {
//   return $.ajax({
//     method: 'GET',
//     url: `api/weather/`,
//     data: { weather: { lat: lat, long: long, date: date } }
//   });
// };

export const fetchWeather = (address) => {

  return $.ajax({
    method: 'GET',
    url: `api/weather/`,
    data: { address }
  });
    // data: { weather: { lat: lat, long: long, date: date } }
  // });
};
