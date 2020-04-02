import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Test", () => {
  let areas;
  let listings;
  let currentListing;
  let favoriteListingData;
  let userInfo;
  beforeEach(() => {
    userInfo = {
      name: "Han Solo",
      email: "HS@wookipedia.com",
      purpose: "Buisness",
      favoriteLocations: []
    };

    areas = [
      {
        nickName: "RiNo",
        name: "River North",
        details: "/api/v1/areas/590",
        listings: [1, 2, 4]
      },
      {
        nickName: "Park Hill",
        name: "Park Hill",
        details: "/api/v1/areas/751",
        listings: [1, 2, 4, 8, 8, 1]
      }
    ];

    listings = [
      {
        listing_id: 3,
        area_id: 590,
        name: "Hip RiNo Party Spot",
        address: {
          street: "2250 Lawrence St",
          zip: "80205"
        },
        details: {
          neighborhood_id: 5124122,
          superhost: true,
          seller_source: "91jss1",
          beds: 3,
          baths: 2.5,
          cost_per_night: 420,
          features: ["hot tub", "espresso machine"]
        },
        dev_id: "u4gh2j",
        area: "rino",
        db_connect: 834470
      }
    ];
    currentListing = {
      listing_id: 3,
      area_id: 590,
      name: "Hip RiNo Party Spot",
      address: {
        street: "2250 Lawrence St",
        zip: "80205"
      },
      details: {
        neighborhood_id: 5124122,
        superhost: true,
        seller_source: "91jss1",
        beds: 3,
        baths: 2.5,
        cost_per_night: 420,
        features: ["hot tub", "espresso machine"]
      },
      dev_id: "u4gh2j",
      area: "rino",
      db_connect: 834470
    };
    favoriteListingData = [currentListing];
  });

  it("should display the areas info", () => {
    const mockfavorite = jest.fn();
    const mockchangeview = jest.fn();
    const mockisFavorite = jest.fn();
    const mockgoToFavRentals = jest.fn();
    const mockgoToListing = jest.fn();
    mockisFavorite.mockReturnThis("true");
    const { getByText } = render(
      <MemoryRouter initialEntries={["/areas"]}>
        <Dashboard
          areas={areas}
          changeView={mockchangeview}
          currentListing={currentListing}
          favorite={mockfavorite}
          favoriteListingData={favoriteListingData}
          goToFavRentals={mockgoToFavRentals}
          goToListing={mockgoToListing}
          isFavorite={mockisFavorite}
          isLoading={false}
          listings={listings}
          userInfo={userInfo}
        />
      </MemoryRouter>
    );

    expect(getByText("Park Hill")).toBeInTheDocument();
  });
  it("should display the listings in an area info", () => {
    const mockfavorite = jest.fn();
    const mockchangeview = jest.fn();
    const mockisFavorite = jest.fn();
    const mockgoToFavRentals = jest.fn();
    const mockgoToListing = jest.fn();
    mockisFavorite.mockReturnThis("true");
    const { getByText } = render(
      <MemoryRouter initialEntries={["/areas/river-north"]}>
        <Dashboard
          areas={areas}
          changeView={mockchangeview}
          currentListing={currentListing}
          favorite={mockfavorite}
          favoriteListingData={favoriteListingData}
          goToFavRentals={mockgoToFavRentals}
          goToListing={mockgoToListing}
          isFavorite={mockisFavorite}
          isLoading={false}
          listings={listings}
          userInfo={userInfo}
        />
      </MemoryRouter>
    );

    expect(getByText("Hip RiNo Party Spot")).toBeInTheDocument();
  });
});
