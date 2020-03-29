import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LocationCard from './LocationCard';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe("Test", () => {
  let listingData;
  let favoriteLocations;
  beforeEach(() => {
    listingData = {
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
  });

  it('should display the locations info', () => {
    const mockFavorite = jest.fn();
    const mockIsFavorite = jest.fn();
    const mockChangeView = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <LocationCard
          favorite={mockFavorite}
          key={listingData.listing_id}
          listingData={listingData}
          goToListing={mockChangeView}
          favoriteLocations = {favoriteLocations}
          isFavorite = {mockIsFavorite}

          />
      </BrowserRouter>
    );

    const locationNameEl = getByText("Hip RiNo Party Spot");
    const locationAddressEl = getByText("2250 Lawrence St");

    expect(locationNameEl).toBeInTheDocument();
    expect(locationAddressEl).toBeInTheDocument();

  });

  it('should be able to change views', () => {
    const mockChangeView = jest.fn();
        const mockIsFavorite = jest.fn();
    const mockFavorite = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <LocationCard
          favorite={mockFavorite}
          key={listingData.listing_id}
          listingData={listingData}
          goToListing={mockChangeView}
          favoriteLocations = {favoriteLocations}
          isFavorite = {mockIsFavorite}

          />
      </BrowserRouter>
    );
    const goToListing = getByText('Go to Listing');

    fireEvent.click(goToListing);
``
    expect(mockChangeView).toHaveBeenCalledTimes(1);
    expect(mockChangeView).toHaveBeenCalledWith(3,'LocationListingCard');
  });

  it('should be able to favorite locations', () => {
    const mockChangeView = jest.fn();
        const mockIsFavorite = jest.fn();
    const mockFavorite = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <LocationCard
          favorite={mockFavorite}
          key={listingData.listing_id}
          listingData={listingData}
          goToListing={mockChangeView}
          favoriteLocations = {favoriteLocations}
          isFavorite = {mockIsFavorite}

          />
      </BrowserRouter>
    );
    const favoriteButton = getByText('favorite');

    fireEvent.click(favoriteButton);
``
    expect(mockFavorite).toHaveBeenCalledTimes(1);
    expect(mockFavorite).toHaveBeenCalledWith(3);
  });

})
