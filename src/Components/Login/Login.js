import React, { Component } from "react";

class Login extends Component {
  defaultState = {
    userName:"",
    email:"",
    purpose:""
  }
  constructor() {
    super();
    this.state = this.defaultState;
  }
  render() {
    return <div>Hello</div>;
  }
}

export default Login;
