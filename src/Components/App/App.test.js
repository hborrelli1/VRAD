import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { fetchLocations, fetchAreas } from "../../ApiCalls/ApiCalls.js";
jest.mock("../../ApiCalls/ApiCalls.js");

describe("APP", () => {
  let locationResponse;
  let areaResponse;

  beforeEach(() => {
    locationResponse = [
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

    areaResponse = [
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
  });

  test("Should call fetchFunctions", async () => {
    fetchLocations.mockResolvedValue(locationResponse);
    fetchAreas.mockResolvedValue(areaResponse);
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fake" }
      });
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      });
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      });
    });
    const failed = await waitFor(() =>
      getByText("User Name must be 5 characters long!")
    );
    expect(failed).toBeInTheDocument();
    fireEvent.click(getByText("Login"));
  });

  test("Should change to areas view", async () => {
    fetchLocations.mockResolvedValue(locationResponse);
    fetchAreas.mockResolvedValue(areaResponse);
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fakeUser" }
      });
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      });
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      });
    });
    fireEvent.click(getByText("Login"));
    const riverNorth = await waitFor(() => getByText("River North - (RiNo)"));
    expect(riverNorth).toBeInTheDocument();

    const listingButton = await waitFor(() =>
      getByText("View 3 Listings in RiNo")
    );

    // await wait(() => expect(getByText('View 3 Listings in RiNo'))).toBeInTheDocument;
    // await wait(() => expect(getByText('Park Hill'))).toBeInTheDocument;
  });

  test("Should change to locations view", async () => {
    fetchLocations.mockResolvedValue(locationResponse);
    fetchAreas.mockResolvedValue(areaResponse);
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fakeUser" }
      });
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      });
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      });
    });
    fireEvent.click(getByText("Login"));
    const riverNorth = await waitFor(() => getByText("River North - (RiNo)"));
    expect(riverNorth).toBeInTheDocument();

    const listingButton = await waitFor(() =>
      getByText("View 3 Listings in RiNo")
    );
    fireEvent.click(listingButton);
    const hipPartySpot = await waitFor(() => getByText("Hip RiNo Party Spot"));
    expect(hipPartySpot).toBeInTheDocument();
  });
  test("Should change to listings view", async () => {
    fetchLocations.mockResolvedValue(locationResponse);
    fetchAreas.mockResolvedValue(areaResponse);
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fakeUser" }
      });
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      });
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      });
    });
    fireEvent.click(getByText("Login"));
    const riverNorth = await waitFor(() => getByText("River North - (RiNo)"));
    expect(riverNorth).toBeInTheDocument();

    const locationButton = await waitFor(() =>
      getByText("View 3 Listings in RiNo")
    );
    fireEvent.click(locationButton);
    const listingButton = await waitFor(() => getByText("Go to Listing"));
    fireEvent.click(listingButton);
    const features = await waitFor(() => getByText("espresso machine"));
    expect(features).toBeInTheDocument();
  });

  test("Should change to favorites", async () => {
    fetchLocations.mockResolvedValue(locationResponse);
    fetchAreas.mockResolvedValue(areaResponse);
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fakeUser" }
      });
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      });
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      });
    });
    fireEvent.click(getByText("Login"));
    const riverNorth = await waitFor(() => getByText("River North - (RiNo)"));
    expect(riverNorth).toBeInTheDocument();

    const favoriteButton = await waitFor(() => getByText("Favorited Rentals"));
    fireEvent.click(favoriteButton);
    const hipPartySpot = await waitFor(() => getByText("Hip RiNo Party Spot"));
    expect(hipPartySpot).toBeInTheDocument();
    const favorites = await waitFor(() => getByText("favorites"));
    expect(favorites).toBeInTheDocument();
  });
});
