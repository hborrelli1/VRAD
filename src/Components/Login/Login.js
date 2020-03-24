import React, { Component } from "react";
import PropTypes from 'prop-types';
// import "./Login.scss"

class Login extends Component {
  constructor() {
    super();
    this.state = this.defaultState;
  }
  defaultState = {
    userName: "",
    email: "",
    purpose: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  loginAttempt = event => {
    event.preventDefault();
    const { login } = this.props;
    login(this.state);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="User Name"
          name="userName"
          value={this.state.userName}
          onChange={event => this.handleChange(event)}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={this.state.email}
          onChange={event => this.handleChange(event)}
        />

        <button onClick={this.loginAttempt}>Login</button>
      </form>
    );
  }
}

Login.propTypes = {
  Login: PropTypes.func
}

export default Login;
