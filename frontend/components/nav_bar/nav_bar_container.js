import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logout, login } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  let currentUser = null;
  if (state.session.currentUser) {
    currentUser = state.session.currentUser.username;
  }
  return {
    currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
