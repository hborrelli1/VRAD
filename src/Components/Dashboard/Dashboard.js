import React from 'react'
import PropTypes from 'prop-types'
import UserProfile from '../UserProfile/UserProfile';
import {Switch, Route} from "react-router-dom";
import AreaContainer from "../AreaContainer/AreaContainer";
import LocationContainer from "../LocationContainer/LocationContainer";
import './Dashboard.scss';

const Dashboard = ({ userInfo, areas, goToFavRentals, goToListing, favorite,listings, changeView }) => {
  const { favoriteLocations } = userInfo;
  return (
    <div className="dashboard">
      <UserProfile
        userInfo={userInfo}
        goToFavRentals={goToFavRentals}
      />

      <Switch>
        <Route exact path="/" render={() => (
          <AreaContainer
            areas={areas}
            changeView={changeView}
          />)}
        />

      <Route exact path="/areas/:id" render={() => (
          <LocationContainer
            goToListing={goToListing}
            favorite={favorite}
            listings={listings}
            favoriteLocations = {favoriteLocations}
          />)}
        />

      </Switch>
    </div>
  )
}

Dashboard.propTypes = {
  userInfo: PropTypes.object,
  goToFavRentals: PropTypes.func,
  areas: PropTypes.array,
  changeView: PropTypes.func,
  goToListing: PropTypes.func,
  favorite: PropTypes.func,
  listings: PropTypes.array
}

export default Dashboard
