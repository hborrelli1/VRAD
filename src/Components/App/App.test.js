import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {fetchLocations,fetchAreas } from "../../ApiCalls/ApiCalls.js";
jest.mock("../../ApiCalls/ApiCalls.js")

describe("APP", () => {
  let listingDetails;
  let favoriteLocations;
  let locationResponse;
  let areaResponse;

  beforeEach(()=>{
    listingDetails = ['/api/v1/listings/3','/api/v1/listings/44']
    favoriteLocations = [3];
    locationResponse =
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

        areaResponse = [
          {
              "nickName": "RiNo",
              "name": "River North",
              "details": "/api/v1/areas/590",
              "listings": [1,2,4]
          },
          {
              "nickName": "Park Hill",
              "name": "Park Hill",
              "details": "/api/v1/areas/751",
              "listings": [1,2,4,8,8,1]
          }
        ];
  })

  test("Should call fetchFunctions", async () => {
    fetchLocations.mockResolvedValue(locationResponse)
    fetchAreas.mockResolvedValue(areaResponse)
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App

        />
      </BrowserRouter>
    );
    await wait(() =>
    {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fakeUser" }
      })
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      })
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      })
      fireEvent.click(getByText("Login"))
    });

    expect(fetchAreas).toHaveBeenCalled()

  });

  test("Should change to areas view", async () => {
    fetchLocations.mockResolvedValue(locationResponse)
    fetchAreas.mockResolvedValue(areaResponse)
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App

        />
      </BrowserRouter>
    );
    await wait(() =>
    {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fakeUser" }
      })
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      })
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      })
      fireEvent.click(getByText("Login"))
    });

    const areaEl1 = await wait(() => expect(getByText('River North - (RiNo)'))).toBeInTheDocument;
    const areaEl2 = await wait(() => expect(getByText('View 3 Listings in RiNo'))).toBeInTheDocument;
    const areaEl3 = await wait(() => expect(getByText('Park Hill'))).toBeInTheDocument;
    expect(fetchAreas).toHaveBeenCalled()
  });
  test("Should change to locations view", async () => {
    fetchLocations.mockResolvedValue(locationResponse)
    fetchAreas.mockResolvedValue(areaResponse)
    const { getByText, getByLabelText, getByPlaceholderText, debug } = render(
      <BrowserRouter>
        <App

        />
      </BrowserRouter>
    );
    await wait(() =>
    {
      fireEvent.change(getByPlaceholderText("User Name"), {
        target: { value: "fakeUser" }
      })
      fireEvent.change(getByPlaceholderText("Email@provider.com"), {
        target: { value: "fakeUser@gmail.com" }
      })
      fireEvent.change(getByLabelText("purpose of travel"), {
        target: { value: "buisness" }
      })
      fireEvent.click(getByText("Login"))
    });



    const areaEl1 = await wait(() => expect(getByText('River North - (RiNo)'))).toBeInTheDocument;
    const areaEl2 = await wait(() => expect(getByText('View 3 Listings in RiNo'))).toBeInTheDocument;
    const areaEl3 = await wait(() => expect(getByText('Park Hill'))).toBeInTheDocument;
    await wait(() => fireEvent.click(getByText("View 3 Listings in RiNo")));

    expect(getByText("Hip RiNo Party Spot")).toBeInTheDocument();
  });

})
