import React from 'react';
import './UserProfile.scss';

const UserProfile = ({ userInfo, goToFavRentals }) => {

  const { name, email, purpose, favoriteLocations } = userInfo;
  const greeting = `Select from the following areas to find the perfect location for your ${purpose} trip!`;

  return (
    <div className="user-profile">
      <div className="welcome-header">
        <h3>{`Welcome, ${name}!`}</h3>
        <p className="greeting">{greeting}</p>
        <p className="email">{email}</p>
      </div>
      <div className="user-meta">
        <h4>Reason for visiting:</h4>
        <p className="purpose">{purpose}</p>
        <button
          onClick={goToFavRentals}
        >Favorited Rentals <span>{favoriteLocations.length}</span></button>
      </div>
      <div></div>
    </div>
  )
}

UserProfile.propTypes = {
  userInfo: PropTypes.object,
  goToFavRentals: PropTypes.func
}

export default UserProfile;
