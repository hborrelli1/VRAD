import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\']+(\.[^<>()\[\]\.,;:\s@\']+)*)|(\'.+\'))@(([^<>()[\]\.,;:\s@\']+\.)+[^<>()[\]\.,;:\s@\']{2,})$/i
);

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      purpose: "",
      errors: {
        name: "",
        email: "",
        purpose: "default"
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "name":
        errors.name =
          value.length < 5 ? "User Name must be 5 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "purpose":
        errors.purpose =
          value === "default" ? "Choose Reason for Traveling." : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      // console.log(errors);
    });
  };

  handleSubmit = event => {
    if (this.validateForm(this.state.errors)) {
      const { login } = this.props;
      const { name, email, purpose } = this.state;
      login({
        name: name,
        email: email,
        purpose: purpose
      });
    } else {
      console.error("Invalid Form");
    }
  };

  validateForm = () => {
    let valid = true;
    const { errors, name, email } = this.state;
    valid =
      errors.email.length === 0 &&
      errors.name.length === 0 &&
      name !== "" &&
      email !== "" &&
      errors.purpose.length === 0;
    return valid;
  };

  render() {
    const { errors, name, email, purpose } = this.state;
    const isEnabled = this.validateForm();
    return (
      <form>
        <div className="input-wrapper">
          <span className="error">{errors.name}</span>
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={name}
            onChange={event => this.handleChange(event)}
          />
        </div>

        <div className="input-wrapper">
          <span className="error">{errors.email}</span>
          <input
            type="text"
            placeholder="Email@provider.com"
            name="email"
            value={email}
            onChange={event => this.handleChange(event)}
          />
        </div>
        <div className="input-wrapper">
          <select
            name="purpose"
            aria-label="purpose of travel"
            value={purpose}
            onChange={event => this.handleChange(event)}
          >
            <option value="default">Select a Purpose</option>
            <option value="buisness">Buisness</option>
            <option value="vacation">Vaction</option>
            <option value="other"> Other</option>
          </select>
        </div>
        <Link to="/areas" >
          <button disabled={!isEnabled} onClick={this.handleSubmit}>Login</button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  Login: PropTypes.func
};

export default Login;
