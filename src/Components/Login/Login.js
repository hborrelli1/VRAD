import React, { Component } from "react";
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

  updateState = event => {};

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="User Name"
          name="userName"
          value={this.state.userName}
          onChange={event => this.updateState(event)}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={this.state.email}
          onChange={event => this.updateState(event)}
        />

        <button onClick={this.login}>Login</button>
      </form>
    );
  }
}

export default Login;
