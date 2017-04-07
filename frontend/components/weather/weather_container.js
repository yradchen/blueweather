import { connect } from 'react-redux';
import CurrentWeather from './current_weather';

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.params.location,
    weather: state.weather
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
