import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component {
  constructor (props) {
    super(props);
    this.logOutUser = this.logOutUser.bind(this);
  }

  sessionLinks() {
    const guest = { username: "Guest", password: "wizardhat1" };
    return (
      <div className="flex session-links">
        <button className="login guest"
          onClick={() => this.props.login(guest)}>
          Guest
          </button>
        <Link to="/login" className="login">Log in</Link>
        <Link to="/signup" id="signup">Sign up</Link>
      </div>
    );
  }

  logOutUser(e) {
    this.props.logout();
  }

  showName() {
    return (
      <div className="flex session-links">
        <p>{this.props.currentUser}</p>
        <button onClick={this.logOutUser} id="logout">Log Out</button>
      </div>
    );
  }

  render() {
    const display = this.props.currentUser ? this.showName() : this.sessionLinks();

    return (
      <header>
        <div className="session-links flex">
          <Link to="/" id="home"><img src={images.logo} id="nav-logo"/></Link>
        </div>
        {display}
      </header>
    );
  }
}

export default NavBar;
