import React, { Component } from "react";
import "./App.scss";
import Login from "../Login/Login.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        userName: "",
        email: "",
        purpose: ""
      }
    };
  }

  login = (userInfo) => {
    console.log(userInfo);
    this.setState({userInfo:userInfo,isLoggedIn:true})
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
