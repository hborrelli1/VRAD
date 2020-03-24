import React from 'react';
import UserProfile from '../UserProfile/UserProfile';

import './App.css';

function App() {
  let userInfo = {
    name: 'Ham Leadbeater',
    email: 'ham@gmail.com',
    purpose: 'business',
    favoriteLocations: [32, 45]
  }

  return (
    <div className="App">
      <UserProfile userInfo={userInfo}/>
    </div>
  );
}

export default App;
