import React, { Component } from "react";
import "./App.scss";
import Login from "../Login/Login.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        email: "",
        purpose: "",
        favoriteLocations: []
      }
    };
  }

  login = userData => {
    const userState = this.state.userInfo;
    const updatedState = this.setState({
      userInfo: { ...userState, ...userData}
    });
  };
  render() {
    return (
      <div className="App">
        <Login login={this.login} />
      </div>
    );
  }
}

export default App;
