import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import LocationContainer from "./LocationContainer";
import "@testing-library/jest-dom";
import {apiCall} from "./apiCalls";
jest.mock('./apiCalls')

describe("Test", () => {
  let listingDetails;
  let favoriteLocations;
  let response;
  beforeEach(() => {
    listingDetails = ['/api/v1/listings/3','/api/v1/listings/44']
    favoriteLocations = [3];

    response =
        [{
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
        }]

  });

  it("should display the locations info", async () => {
    const mockFavorite = jest.fn();
    const mockChangeView = jest.fn();
    apiCall.mockResolvedValue(response)
    const { getByText,debug} = render(
      <LocationContainer
        favorite={mockFavorite}
        goToListing={mockChangeView}
        favoriteLocations={favoriteLocations}
        listings={listingDetails}

      />
    );
    await wait(()=> {
      const locationNameEl = getByText("Hip RiNo Party Spot");
      const locationAddressEl = getByText("2250 Lawrence St");

      expect(locationNameEl).toBeInTheDocument();
      expect(locationAddressEl).toBeInTheDocument();
    })

  });
});
