import React, { Component } from "react";
import Login from "../Login/Login.js";
import Header from "../Header/Header.js";

import Footer from "../Footer/Footer";
import "./App.scss";
import { Route, Redirect } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import { fetchAreas } from "../../ApiCalls/ApiCalls";


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

  componentDidMount = async () => {
    let areasList = await fetchAreas();
    this.setState({ areas: areasList });
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
    return <Redirect to = "/login"/>
  }

  render() {

    const {listings} = this.state;
    return (

      <main className="App">

        {!this.state.isLoggedIn && <Redirect to = "/login"/>}

        <Header
          isLoggedIn={this.state.isLoggedIn}
          toggleLogin={this.toggleLogin}
        />
      <Route path="/areas">
          <Dashboard
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

      </Route>
      <Route path="/login" >
        <Login login={this.login} />
      </Route>

        <Footer />
      </main>
    );
  }
}

export default App;
