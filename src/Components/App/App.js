import React, { Component } from "react";
import "./App.scss";
import Login from "../Login/Login.js";
import UserProfile from '../UserProfile/UserProfile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        email: "",
        purpose: "",
        favoriteLocations: [32,2]
      }
    };
  }

  login = userData => {
    const userState = this.state.userInfo;
    const updatedState = this.setState({
      userInfo: { ...userState, ...userData}
    });
  };

  goToFavRentals = () => {
    console.log('clicked');
  }

  render() {
    return (
      <div className="App">
        <Login login={this.login} />
          <UserProfile
          userInfo={this.state.userInfo}
          goToFavRentals={this.goToFavRentals}
          />

      </div>
    );
  }
}

export default App;
