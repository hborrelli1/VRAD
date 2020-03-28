import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, toggleLogin }) => {
  const blankUser = {
    isLoggedIn: false,
    userInfo: {
      name: "",
      email: "",
      purpose: "",
      favoriteLocations: []
    },
    listings:[],
    currentView: 'Login'
  }

  return (
    <header>
      <div className="logo">VRAD</div>
      {isLoggedIn && (
        <Link
          to="/"
          onClick={() => toggleLogin(blankUser)}
        >Log Out</Link>
      )}
    </header>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  toggleLogin: PropTypes.func
}

export default Header;
