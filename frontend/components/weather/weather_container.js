import { connect } from 'react-redux';
import CurrentWeather from './current_weather';
import { createSearch, fetchSearches } from '../../actions/search_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.params.location,
    weather: state.weather,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createSearch: (search) => dispatch(createSearch(search))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
