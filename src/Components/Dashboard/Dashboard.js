import React from "react";
import PropTypes from "prop-types";
import UserProfile from "../UserProfile/UserProfile";
import { Switch, Route } from "react-router-dom";
import AreaContainer from "../AreaContainer/AreaContainer";
import LocationContainer from "../LocationContainer/LocationContainer";
import LocationListingCard from "../LocationListingCard/LocationListingCard";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import './Dashboard.scss';

const Dashboard = ({
  userInfo,
  areas,
  goToFavRentals,
  goToListing,
  favorite,
  isFavorite,
  listings,
  changeView,
  currentListing,
  favoriteListingData,
  isLoading
}) => {
  const { favoriteLocations } = userInfo;
  return (
    <div className="dashboard">
      <Route
        path = "/"
        render={({location})=> {
          return(
            <Breadcrumb
              path = {location.pathname}
            />

          )

        }}
        />

      <Route
        render = {({location, history}) =>
          <UserProfile userInfo={userInfo} goToFavRentals={goToFavRentals} pathName = {location.pathname} />
        }
      />

      <Switch>
        <Route
          exact
          path="/areas/"
          render={() => <AreaContainer areas={areas} changeView={changeView} />}
        />
      <Route
        exact
        path="/favorites"
        render={() => {

          return (
            <LocationContainer
              areaName={'favorites'}
              isLoading = {isLoading}
              goToListing={goToListing}
              favorite={favorite}
              isFavorite={isFavorite}
              listings={favoriteListingData}
              favoriteLocations={favoriteLocations}
              />
          );
        }}
        />

        <Route
          exact
          path="/areas/:id"
          render={({ match }) => {
            const areaName = match.params.id;
            return (
              <LocationContainer
                areaName={areaName}
                isLoading = {isLoading}
                goToListing={goToListing}
                favorite={favorite}
                isFavorite={isFavorite}
                listings={listings}
                favoriteLocations={favoriteLocations}
              />
            );
          }}
        />

        <Route
          exact
          path="/areas/:areaName/:id"
          render={({ match }) => {
            const areaName = match.params.id;
            return <LocationListingCard
              favorite={favorite}
              isFavorite={isFavorite}
              currentListing={currentListing}
              areaName={areaName}
            />}}
        />
      </Switch>
    </div>
  );
};

export default Dashboard;
