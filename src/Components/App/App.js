import React, { Component } from "react";
import Login from "../Login/Login.js";
import UserProfile from "../UserProfile/UserProfile";
import AreaContainer from "../AreaContainer/AreaContainer"
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        email: "",
        purpose: "",
        favoriteLocations: [32, 2]
      },
      currentView:""
    };
  }

  login = userData => {
    const userState = this.state.userInfo;
    const updatedState = this.setState({
      userInfo: { ...userState, ...userData },
      isLoggedIn:true,
      currentView:'AreaContainer'
    });
  };

  goToFavRentals = () => {
    console.log("clicked");
  };

  render() {
    return (
      <main className="App">
        {!this.state.isLoggedIn && <Login login={this.login} />}
        {this.state.isLoggedIn && (
          <UserProfile
            userInfo={this.state.userInfo}
            goToFavRentals={this.goToFavRentals}
          />
        )}
        {this.state.isLoggedIn && this.state.currentView ==="AreaContainer" && (
          <AreaContainer/>
        )}
      </main>
    );
  }
}

export default App;
