export const fetchWeather = (lat, long, date) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const baseUrl = 'https://api.darksky.net/forecast/';
  const key = "ed962598e51297ed8e2ffacf5d6522b4";
  let url = `${baseUrl}${key}/${lat},${long}`;
  if (date) {
    url += `${date}`;
  }

  return $.ajax({
    method: 'GET',
    url: proxy + url
  });
};
