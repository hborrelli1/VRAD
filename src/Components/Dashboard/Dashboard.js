import React from 'react'
import PropTypes from 'prop-types'
import UserProfile from '../UserProfile/UserProfile';

const Dashboard = ({ userInfo, areas, goToFavRentals, goToListing, favorite, listings }) => {
  const { favoriteLocations } = userInfo;

  return (
    <main>
      <UserProfile
        userInfo={userInfo}
        goToFavRentals={goToFavRentals}
      />

      <Switch>
        <Route exact path="/" render={() => (
          <AreaContainer
            areas={areas}
            changeView={this.changeView}
          />)}
        />

        <Route exact path="/:area" render={() => (
          <LocationContainer
            goToListing={goToListing}
            favorite={favorite}
            listings={listings}
            favoriteLocations = {favoriteLocations}
          />)}
        />

      </Switch>
    </main>
  )
}

export default Dashboard
