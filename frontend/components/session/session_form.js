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

  createInput(type) {
    return (<input type='text'
      value={this.state.type}
      placeholder={type}
      onChange={this.update(type)}
      key={type}
      className="capitalize"
    />
    );
  }

  setFields() {
    const fields = ["email", "username", "password"];
    return fields.map(field => {
      return this.createInput(field);
    });
  }
  createSubmit() {
    return (
      <input
        type="submit"
        value="Create Account"
      />
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.setFields()}
        {this.createSubmit()}
      </form>

    );
  }
}

export default SessionForm;
