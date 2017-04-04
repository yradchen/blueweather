import { connect } from 'react-redux';
import NavBar from './nav_bar';

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
