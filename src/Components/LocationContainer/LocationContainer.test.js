import React from "react";
import { render, waitFor } from "@testing-library/react";
import LocationContainer from "./LocationContainer";
import "@testing-library/jest-dom";
import {fetchLocations} from "../../ApiCalls/ApiCalls.js";
import { BrowserRouter } from 'react-router-dom';
jest.mock("../../ApiCalls/ApiCalls.js")

describe("Test", () => {
  let favoriteLocations;
  let response;
  beforeEach(() => {
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
    const mockIsFavorite = jest.fn();
    const mockChangeView = jest.fn();
    fetchLocations.mockResolvedValue(response)
    const { getByText} = render(
      <BrowserRouter>
        <LocationContainer
          favorite={mockFavorite}
          goToListing={mockChangeView}
          favoriteLocations={favoriteLocations}
          listings={response}
          isFavorite={mockIsFavorite}
        />
      </BrowserRouter>
    );
    await waitFor(()=> expect(getByText("Hip RiNo Party Spot")).toBeInTheDocument())
    await waitFor(()=> expect(getByText("2250 Lawrence St")).toBeInTheDocument())

  });
});
