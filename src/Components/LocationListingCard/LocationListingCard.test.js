import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LocationListingCard from './LocationListingCard';
import { BrowserRouter } from 'react-router-dom';

describe("LocationListingCard Test", () => {
  let currentListing;
  let favoriteLocations

  beforeEach(() => {
    currentListing = {
      "listing_id": 3,
      "area_id": 590,
      "name": "Hip RiNo Party Spot",
      "address": {
        "street": "2250 Lawrence St",
        "zip": "80205"
      },
      "details": {
          "neighborhood_id": 5124122,
          "superhost": true,
          "seller_source": "91jss1",
          "beds": 3,
          "baths": 2.5,
          "cost_per_night": 420,
          "features": [
            "hot tub",
            "espresso machine"
          ]
      },
      "dev_id": "u4gh2j",
      "area": "rino",
      "db_connect": 834470
    }
    favoriteLocations = [3];
  })

  it("should be able to render location info to DOM", () => {
    const mockIsFavorite = jest.fn();
    const mockFavorite = jest.fn();
    const { getByText } = render(
      <LocationListingCard
        currentListing={currentListing}
        isFavorite={mockIsFavorite}
        areaName={'river-north'}
        favorite={mockFavorite}
      />
    );

    const locationNameEl = getByText('Hip RiNo Party Spot');
    const locationAddressEl = getByText('Address: 2250 Lawrence St, 80205');
    const priceEl = getByText('Cost Per Night: $420');
    const featureEl = getByText('hot tub');

    expect(locationNameEl).toBeInTheDocument();
    expect(locationAddressEl).toBeInTheDocument();
    expect(priceEl).toBeInTheDocument();
    expect(featureEl).toBeInTheDocument();
  });

  it('should be able to add to Favorites', () => {
    const mockIsFavorite = jest.fn().mockImplementation(() => 'ADD-TO-FAVORITES');
    const mockFavorite = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <LocationListingCard
          currentListing={currentListing}
          isFavorite={mockIsFavorite}
          areaName={'river-north'}
          favorite={mockFavorite}
        />
      </BrowserRouter>
    );
    const addToFavButton = getByText('ADD-TO-FAVORITES');

    fireEvent.click(addToFavButton);

    expect(mockIsFavorite).toHaveBeenCalledTimes(1);
    expect(mockIsFavorite).toHaveBeenCalledWith(3);
  });
  
});
