import React from 'react';

const UserProfile = ({ userInfo }) => {
  const greeting = `Select from the following areas to find the perfect location for your ${userInfo.purpose} trip!`;

  return (
    <div className="user-profile">
      <div className="welcome-header">
        <h3>{`Welcome, ${userInfo.name}!`}</h3>
        <p className="greeting">{greeting}</p>
        <p>{userInfo.email}</p>
      </div>
      <div className="user-meta">
        <h4>Reason for visiting:</h4>
        <p className="purpose">{userInfo.purpose}</p>
        <button>Favorited Rentals <span>{userInfo.favoriteLocations.length}</span></button>
      </div>
    </div>
  )
}

export default UserProfile;
