import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserProfile from './UserProfile';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('UserProfile', () => {
  let userInfo;

  beforeEach(() => {
    userInfo = {
      name: 'Ham Leadbeater',
      email: 'ham@gmail.com',
      purpose: 'business',
      favoriteLocations: [54, 322]
    }
  });

  it('Should render the component to the page', () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserProfile userInfo={userInfo} />
      </BrowserRouter>
    );

    expect(getByText('Welcome, Ham Leadbeater!')).toBeInTheDocument();
    expect(getByText('ham@gmail.com')).toBeInTheDocument();
    expect(getByText('business')).toBeInTheDocument();
    expect(getByText('Favorited Rentals')).toBeInTheDocument();
  });

  it('should be able to click on the favorited rentals button', () => {
    const mockGoToFavRentals = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <UserProfile
          userInfo={userInfo}
          goToFavRentals={mockGoToFavRentals}
          />
      </BrowserRouter>
    );

    fireEvent.click(getByText('Favorited Rentals'));
    expect(mockGoToFavRentals).toHaveBeenCalledTimes(1);
  });

});
