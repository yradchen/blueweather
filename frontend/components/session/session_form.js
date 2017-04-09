import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value});
  }

  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ username: "", password: "", email: ""});
    }
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  createInput(fieldName) {
    const type = fieldName === 'username' ? 'text' : fieldName;
    return (<input type={type}
      value={this.state[fieldName]}
      placeholder={fieldName}
      onChange={this.update(fieldName)}
      key={fieldName}
    />
    );
  }

  setFields() {
    const fields = ["username", "password"];
    if (this.props.formType === "signup") {
      fields.push("email");
    }

    return fields.map(field => {
      return this.createInput(field);
    });
  }

  createSubmit() {
    const value = this.props.formType === "login" ? "Sign In" : "Create Account";
    return (
      <input
        type="submit"
        value={value}
        className="submit-button"
      />
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state);
  }

  setHeader() {
    const header = this.props.formType === "login" ? "Log in" : "Sign up";
    return <h3 id="session-header">{header}</h3>;
  }


  render() {
    const errors = <li id="errors">{this.props.errors[0]}</li>;

    return (
      <section className="form-container">
        <form onSubmit={this.handleSubmit} className="form">
          {this.setHeader()}
          {this.setFields()}
          {this.createSubmit()}
          {errors}
        </form>

      </section>

    );
  }
}

export default SessionForm;
