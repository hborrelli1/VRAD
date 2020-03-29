import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header Tests', () => {
  it('Should only render VRAD when not logged in', () => {
    const mockLogin = jest.fn();
    const { getByText } = render(<BrowserRouter>
      <Header
        isLoggedIn={false}
        toggleLogin={mockLogin}
      />
    </BrowserRouter>);

    expect(getByText('VRAD')).toBeInTheDocument();
  });

  it('Should also render the logout button when logged in', () => {
    const { getByText } = render(<BrowserRouter>
      <Header
        isLoggedIn={true}
      />
    </BrowserRouter>);
    const logOutButton = getByText('Log Out');

    expect(logOutButton).toBeInTheDocument();
  });

  it('should be able to log out', () => {
    const mockLogin = jest.fn();
    const { getByText } = render(<BrowserRouter>
      <Header
        isLoggedIn={true}
        toggleLogin={mockLogin}
      />
    </BrowserRouter>);
    const logOutButton = getByText('Log Out');
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

    fireEvent.click(logOutButton)
    expect(mockLogin).toHaveBeenCalledWith(blankUser);

  });
})
