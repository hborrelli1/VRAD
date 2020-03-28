import React, { Component } from "react";
import Login from "../Login/Login.js";
import Header from "../Header/Header.js";

import Footer from "../Footer/Footer";
import "./App.scss";
import { Route, Redirect } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        email: "",
        purpose: "",
        favoriteLocations: [44, 2]
      },
      areas: [],
      listings:["/api/v1/listings/3", "/api/v1/listings/44"],
      currentListing: {},
      // currentView: ""
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

  changeView = (view, destinationURL, areaListings) => {
    this.setState({ currentView: view,listings:areaListings });
  }

  goToFavRentals = () => {
    console.log("clicked");
  };

  goToListing = (listingData, view) => {
    this.setState({ currentView: view, currentListing: listingData });
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

  isFavorite = id => {
    const { favoriteLocations } = this.state.userInfo;
    if (favoriteLocations.includes(id)) {
      return "favorite";
    } else {
      return "add-to-favorites";
    }
  };

  toggleLogin = (blankUser) => {
    this.setState({ ...blankUser })
    return <Redirect to = "/"/>
  }

  render() {

    const {listings} = this.state;
    return (

      <main className="App">
        <Redirect to = "/"/>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          toggleLogin={this.toggleLogin}
        />

        <Route path="/">
          {
            !this.state.isLoggedIn
              ? <Login login={this.login} />
              : <Dashboard
                  userInfo={this.state.userInfo}
                  goToFavRentals={this.goToFavRentals}
                  areas={this.state.areas}
                  changeView = {this.changeView}
                  goToListing = {this.goToListing}
                  favorite = {this.favorite}
                  isFavorite = {this.isFavorite}
                  listings = {this.state.listings}
                  currentListing={this.state.currentListing}
                />
          }
        </Route>

        <Footer />
      </main>
    );
  }
}

export default App;
