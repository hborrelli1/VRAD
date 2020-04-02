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
        favoriteLocations: []
      },
      areas: [],
      listings:[],
      currentListing: {},
      favoriteListingData:[],
      isLoading:false
    };
  }

  componentDidMount = async () => {
    this.setState({isLoading:true})
    let areasList = await fetchAreas();
    this.setState({ areas: areasList });
    this.setState({isLoading:false})
  }


  login = userData => {
    const userState = this.state.userInfo;
    this.setState({
      userInfo: { ...userState, ...userData },
      isLoggedIn: true
    });
  };

  changeView = async (view, destinationURL, areaListings) => {
    this.setState({isLoading:true})
    let data = await fetchLocations(areaListings);
    this.setState({ listings: data});
    this.setState({isLoading:false})
  }

  goToFavRentals = async() => {
    this.setState({isLoading:true})
    let favoriteListings = this.state.userInfo.favoriteLocations;
    let data = await fetchLocations(favoriteListings);
    this.setState({ favoriteListingData: data});
    this.setState({isLoading:false})

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
      filteredFavoritesData = filteredFavoritesData.filter(favoriteData => favoriteData.listing_id!==id)
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
    return <Redirect to = "/login"/>
  }

  render() {

    const {
      areas,
      currentListing,
      favoriteListingData,
      isLoading,
      isLoggedIn,
      listings,
      userInfo
    } = this.state;
    return (

      <main className="App">

        {!isLoggedIn ?
           <Redirect to = "/login"/>
          : <Redirect to = '/areas'/>}

        <Header
          isLoggedIn={isLoggedIn}
          toggleLogin={this.toggleLogin}
        />
      { isLoggedIn && !isLoading && <Route path="/">
          <Dashboard
            areas={areas}
            changeView = {this.changeView}
            currentListing={currentListing}
            favorite = {this.favorite}
            favoriteListingData = {favoriteListingData}
            goToFavRentals={this.goToFavRentals}
            goToListing = {this.goToListing}
            isFavorite = {this.isFavorite}
            isLoading = {isLoading}
            listings = {listings}
            userInfo={userInfo}
            />

      </Route>}
      <Route path="/login" >
        <Login login={this.login} />
      </Route>

        <Footer />
      </main>
    );
  }
}

export default App;
