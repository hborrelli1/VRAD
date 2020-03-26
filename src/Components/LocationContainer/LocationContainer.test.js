import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LocationContainer from "./LocationContainer";
import "@testing-library/jest-dom";
import fetch from 'node-fetch';
import {mocked } from 'ts-jest/utils';

jest.mock('node-fetch',() => {
  return jest.fn();
})

beforeEach(()=>{
  mocked(fetch).mockClear();
})

describe("Test", () => {
  let listingDetails;
  let favoriteLocations;
  let response;
  beforeEach(() => {
    listingDetails = ['/api/v1/listings/3','/api/v1/listings/44']
    favoriteLocations = [3];

    response =
        {
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

  });

  it("should display the locations info", () => {
    const mockFavorite = jest.fn();
    const mockChangeView = jest.fn();
    mocked(fetch).mockImplementation(():Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve(response)
        }
      })
    })

    const { getByText } = render(
      <LocationContainer
        favorite={mockFavorite}
        goToListing={mockChangeView}
        favoriteLocations={favoriteLocations}
        listings={listingDetails}

      />
    );

    const locationNameEl = getByText("Hip RiNo Party Spot");
    const locationAddressEl = getByText("2250 Lawrence St");

    expect(locationNameEl).toBeInTheDocument();
    expect(locationAddressEl).toBeInTheDocument();
  });
});
