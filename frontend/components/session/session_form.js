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

  createInput(fieldName) {
    const type = fieldName === 'username' ? 'text' : fieldName;

    return (<input type={type}
      value={this.state.fieldName}
      placeholder={fieldName}
      onChange={this.update(fieldName)}
      key={fieldName}
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
    const errors = this.props.errors.map((err, idx) => (
      <li key={idx}>{err}</li>
    ));

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.setFields()}
          {this.createSubmit()}
        </form>
        {errors}
      </div>

    );
  }
}

export default SessionForm;
