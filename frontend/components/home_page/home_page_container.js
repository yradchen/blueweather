import { connect } from 'react-redux';
import HomePage from './home_page';
import { fetchWeather } from '../../actions/weather_actions';
import { createSearch } from '../../actions/search_actions';
const mapStateToProps = (state, ownProps) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchWeather: (lat, long) => dispatch(fetchWeather(lat, long)),
    createSearch: (search) => dispatch(createSearch(search))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
