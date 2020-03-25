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
      areas: [],
      currentView: "LocationContainer"
    };
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/api/v1/areas')
      .then(res => res.json())
      .then(areaData => this.getAreaDetails(areaData))
      .then(areasList => this.setState({ areas: areasList }))
      .catch(err => console.log(err.message));
  }

  getAreaDetails = (areaData) => {
    const BASE_URL = 'http://localhost:3001';
    const promises = areaData.areas.map(area => {
      const AREA_ENDPOINT = area.details;
      return fetch(BASE_URL + AREA_ENDPOINT)
        .then(response => response.json())
        .then(areaInfo => {
          console.log(areaInfo);
          return {
            nickName: area.area,
            details:area.details,
            ...areaInfo
          }
        })
    })
    return Promise.all(promises);
  }

  login = userData => {
    const userState = this.state.userInfo;
    const updatedState = this.setState({
      userInfo: { ...userState, ...userData },
      isLoggedIn: true,
      currentView: "AreaContainer"
    });
  };

  changeView = (view, destinationURL) => {
    this.setState({ currentView: view });
  }

  goToFavRentals = () => {
    console.log("clicked");
  };

  goToListing = (listing_id, view) => {
    this.setState({ currentView: view });
  };


  favorite = id => {
    const { favoriteLocations } = this.state.userInfo;
    let updatedState;
    if (favoriteLocations.includes(id)) {
      let filteredArray = favoriteLocations.filter(location => location !== id);
      updatedState = {
        ...this.state.userInfo,
        favoriteLocations: filteredArray
      };
    } else {
      updatedState = {
        ...this.state.userInfo,
        favoriteLocations: [...favoriteLocations, id]
      };
    }
    this.setState({ userInfo: updatedState });
  };

  render() {
    const listingTempData = [
      "/api/v1/listings/3",
      "/api/v1/listings/44",
      "/api/v1/listings/221",
      "/api/v1/listings/744",
      "/api/v1/listings/90",
      "/api/v1/listings/310"
    ];
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

        {this.state.isLoggedIn &&
          this.state.currentView === "LocationContainer" && (
            <LocationContainer
              goToListing={this.goToListing}
              favorite={this.favorite}
              listings={listingTempData}
              favoriteLocations = {this.state.userInfo.favoriteLocations}
            />
          )}
      </main>
    );
  }
}

export default App;
