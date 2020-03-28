import React from "react";
import PropTypes from "prop-types";
import UserProfile from "../UserProfile/UserProfile";
import { Switch, Route } from "react-router-dom";
import AreaContainer from "../AreaContainer/AreaContainer";
import LocationContainer from "../LocationContainer/LocationContainer";
import LocationListingCard from "../LocationListingCard/LocationListingCard";

const Dashboard = ({
  userInfo,
  areas,
  goToFavRentals,
  goToListing,
  favorite,
  listings,
  changeView,
  currentListing
}) => {
  const { favoriteLocations } = userInfo;
  return (
    <main>
      <UserProfile userInfo={userInfo} goToFavRentals={goToFavRentals} />

      <Switch>
        <Route
          exact
          path="/"
          render={() => <AreaContainer areas={areas} changeView={changeView} />}
        />
        <Route
          exact
          path="/areas/:id"
          render={({ match }) => {
            const areaName = match.params.id;
            return (
              <LocationContainer
                areaName={areaName}
                goToListing={goToListing}
                favorite={favorite}
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
            return <LocationListingCard currentListing={currentListing} areaName = {areaName} />;
          }}
        />
        ;
      </Switch>
    </main>
  );
};

export default Dashboard;
