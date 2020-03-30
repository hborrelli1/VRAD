import React, { Component } from "react";
import Login from "../Login/Login.js";
import Header from "../Header/Header.js";

import Footer from "../Footer/Footer";
import "./App.scss";
import { Route, Redirect } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import { fetchAreas } from "../../ApiCalls/ApiCalls";
import { fetchLocations } from "../../ApiCalls/ApiCalls.js";


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: true,
      userInfo: {
        name: "",
        email: "",
        purpose: "",
        favoriteLocations: ['/api/v1/listings/3', '/api/v1/listings/44']
      },
      areas: [],
      listings:[],
      currentListing: {},
      favoriteListingData:[]
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

  changeView = async (view, destinationURL, areaListings) => {
    let data = await fetchLocations(areaListings);
    this.setState({ listings: data});
  }

  goToFavRentals = async() => {
    let favoriteListings = this.state.userInfo.favoriteLocations;
    let data = await fetchLocations(favoriteListings);
    this.setState({ favoriteListingData: data});

  };

  goToListing = (listingData, view) => {
    this.setState({ currentView: view, currentListing: listingData });
  };


  favorite = id => {
    const { favoriteLocations } = this.state.userInfo;
    let updatedState;
    let filteredFavoritesData = this.state.favoriteListingData;
    if (favoriteLocations.includes(`/api/v1/listings/${id}`)) {
      let filteredArray = favoriteLocations.filter(location => location !== `/api/v1/listings/${id}`);
      // Logic to filter favoritedlistingData state and change it.
      filteredFavoritesData = filteredFavoritesData.filter(favoriteData => favoriteData.listing_id!=id)
      updatedState = {
        ...this.state.userInfo,
        favoriteLocations: filteredArray
      };
    } else {
      updatedState = {
        ...this.state.userInfo,
        favoriteLocations: [...favoriteLocations, `/api/v1/listings/${id}`]
      };
    }
    this.setState({ userInfo: updatedState,favoriteListingData:filteredFavoritesData});
  };

  isFavorite = id => {
    const { favoriteLocations } = this.state.userInfo;
    if (favoriteLocations.includes(`/api/v1/listings/${id}`)) {
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
                  favoriteListingData = {this.state.favoriteListingData}
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
