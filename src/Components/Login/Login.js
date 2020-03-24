import React, { Component } from "react";
import PropTypes from "prop-types";
// import "./Login.scss"

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      purpose: "",
      errors: {
        userName: "",
        email: "",
        purpose: ""
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "userName":
        errors.fullName =
          value.length < 5 ? "Full Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if(validateFor)

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
          placeholder="Email@provider.com"
          name="email"
          value={this.state.email}
          onChange={event => this.handleChange(event)}
        />

        <button onClick={this.handleSubmit}>Login</button>
      </form>
    );
  }
}

Login.propTypes = {
  Login: PropTypes.func
};

export default Login;
