import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
