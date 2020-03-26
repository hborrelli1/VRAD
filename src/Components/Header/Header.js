import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, toggleLogin }) => {

  return (
    <div>
    <header>
      <div>logo</div>
      <button>Sign up</button>
    </header>
    </div>
  )
}

export default Header;
