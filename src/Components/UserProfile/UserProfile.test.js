import React from 'react';
import { render } from '@testing-library/react';
import UserProfile from './UserProfile';
import '@testing-library/jest-dom';

describe('UserProfile', () => {

  it('Should render the component to the page', () => {
    let userInfo = {
      name: 'Ham Leadbeater',
      email: 'ham@gmail.com',
      purpose: 'business',
      favoriteLocations: [54, 322]
    }

    const { getByText } = render(
      <UserProfile userInfo={userInfo} />
    );

    expect(getByText('Welcome, Ham Leadbeater!')).toBeInTheDocument();
    expect(getByText('ham@gmail.com')).toBeInTheDocument();
    expect(getByText('business')).toBeInTheDocument();
    expect(getByText('Favorited Rentals')).toBeInTheDocument();
  });
});
