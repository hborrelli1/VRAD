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
      areas: [],
      currentView: ""
    };
  }

  componentDidMount = () => {
    const BASE_URL = 'http://localhost:3001';

    fetch('http://localhost:3001/api/v1/areas')
      .then(res => res.json())
      .then(areaData => {
        const promises = areaData.areas.map(area => {
          const AREA_ENDPOINT = area.details;
          return fetch(BASE_URL + AREA_ENDPOINT)
            .then(response => response.json())
            .then(areaInfo => {
              console.log(areaInfo);
              return {
                nickName: area.area,
                ...areaInfo
              }
            })
        })
        return Promise.all(promises);
      })
      .then(areasList =>
        this.setState({ areas: areasList })
      );
}
  // this.setState({ areas: [...areas.areas] })

  login = userData => {
    const userState = this.state.userInfo;
    const updatedState = this.setState({
      userInfo: { ...userState, ...userData },
      isLoggedIn:true,
      currentView:'AreaContainer'
    });
  };

  changeView = (view, destinationURL) => {
    // Change states view
    this.setState({ currentView: view });

    // Fetch data to display locations by destinationURL

  }

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
          <AreaContainer
            areas={this.state.areas}
            changeView={this.changeView}
          />
        )}
      </main>
    );
  }
}

export default App;
