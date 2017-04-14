export const fetchAddress = (location) => {
  return $.ajax({
    method: 'GET',
    url: `api/reverse_geolocations/`,
    data: { location }
  });
};
