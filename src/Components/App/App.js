import React from 'react';
import UserProfile from '../UserProfile/UserProfile';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        name: 'Ham Leadbeater',
        email: 'ham@gmail.com',
        purpose: 'business',
        favoriteLocations: [32, 45]
      }
    }
  }

  goToFavRentals = () => {
    console.log('clicked');
  }

  render() {
    return (
      <div className="App">
      <UserProfile
      userInfo={this.state.userInfo}
      goToFavRentals={this.goToFavRentals}
      />
      </div>
    );
  }
}

export default App;
