import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.logOutUser = this.logOutUser.bind(this);
  }

  sessionLinks() {
    return (
      <div>
        <Link to="/login">Login</Link>
        <p> | </p>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }

  logOutUser(e) {
    this.props.logout();
  }

  showName() {
    return (
      <div>
        <h1>{this.props.currentUser}</h1>
        <p> | </p>
        <button onClick={this.logOutUser}>Log Out</button>
      </div>
    );
  }

  render() {
    const display = this.props.currentUser ? this.showName() : this.sessionLinks();

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default NavBar;
