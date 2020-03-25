import React, { Component } from "react";
import Login from "../Login/Login.js";
import UserProfile from "../UserProfile/UserProfile";
import AreaContainer from "../AreaContainer/AreaContainer";
import LocationContainer from "../LocationContainer/LocationContainer";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
      userInfo: {
        name: "",
        email: "",
        purpose: "",
        favoriteLocations: [32, 2]
      },
      currentView: ""
    };
  }

  login = userData => {
    const userState = this.state.userInfo;
    const updatedState = this.setState({
      userInfo: { ...userState, ...userData },
      isLoggedIn: true,
      currentView: "AreaContainer"
    });
  };

  goToFavRentals = () => {
    console.log("clicked");
  };

  componentDidMount = () => {
    fetch("http://localhost:3001/api/v1/areas")
      .then(res => res.json())
      .then(area => console.log(area));
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
        {this.state.isLoggedIn &&
          this.state.currentView === "AreaContainer" && <AreaContainer />}
        <LocationContainer
          listings={[
            "/api/v1/listings/3",
            "/api/v1/listings/44",
            "/api/v1/listings/221",
            "/api/v1/listings/744",
            "/api/v1/listings/90",
            "/api/v1/listings/310"
          ]}
        />
      </main>
    );
  }
}

export default App;
