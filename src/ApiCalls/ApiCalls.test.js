import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import App from '../Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { fetchLocations, fetchAreas, getAreaDetails } from './ApiCalls';
jest.mock('./ApiCalls');

describe('ApiCalls Tests', () => {
  let areaData;
  let fetchAreasResponse;
  let locationResponse;

  beforeEach(() => {

    areaData = {
      "areas": [
        {
          "area": "RiNo",
          "details": "/api/v1/areas/590"
        },
        {
          "area": "Park Hill",
          "details": "/api/v1/areas/751"
        },
        {
          "area": "LoHi",
          "details": "/api/v1/areas/408"
        },
        {
          "area": "Cap Hill",
          "details": "/api/v1/areas/240"
        }
      ]
    }

    fetchAreasResponse = [
      {
        "nickName": "RiNo",
        "details": "/api/v1/areas/590",
        "id": 590,
        "name": "River North",
        "location": "North of Downtown Denver",
        "about": "RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
        "region_code": 6356834,
        "quick_search": "o5kod9f5cqo0",
        "listings": [
          "/api/v1/listings/3",
          "/api/v1/listings/44",
          "/api/v1/listings/221",
          "/api/v1/listings/744",
          "/api/v1/listings/90",
          "/api/v1/listings/310"
        ]
      }
    ]

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

  });

  it('should be able to fetch areas', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Ensures App is loading to DOM properly
    const logoEl = getByText('VRAD')
    expect(logoEl).toBeInTheDocument();

    expect(fetchAreas).toHaveBeenCalledTimes(1);
  });

  it('should call fetchAreas which, in turn calls getAreaDetails and outputs the correct data', async () => {
    jest.clearAllMocks();
    fetchAreas.mockImplementation(getAreaDetails(areaData));
    fetchAreas.mockResolvedValue(fetchAreasResponse);
    getAreaDetails.mockResolvedValue(areaData)

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(fetchAreas).toHaveBeenCalledTimes(1);
    expect(getAreaDetails).toHaveBeenCalledTimes(1);
    expect(getAreaDetails).toHaveBeenCalledWith(areaData);
  });

  it('should be able to fetch Locations', async () => {
    jest.clearAllMocks();
    fetchAreas.mockImplementation(getAreaDetails(areaData));
    fetchAreas.mockResolvedValue(fetchAreasResponse);
    fetchLocations.mockResolvedValue(locationResponse);

    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const usernameInput = getByPlaceholderText('User Name');
    const emailInput = getByPlaceholderText('Email@provider.com');
    const purposeSelect = getByLabelText('purpose of travel');
    const loginButton = getByText('Login');
    expect(loginButton).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.change(usernameInput, {target:{value:'Fakeusername'}})
      fireEvent.change(emailInput, {target:{value:'Fakeuser@gmail.com'}})
      fireEvent.change(purposeSelect, {target:{value:'buisness'}})
    })

    fireEvent.click(loginButton)
    const rinoAreaButton = await waitFor(() => getByText('View 6 Listings in RiNo'))

    fireEvent.click(rinoAreaButton)

    expect(fetchLocations).toHaveBeenCalledTimes(1)
    expect(fetchLocations).toHaveBeenCalledWith(fetchAreasResponse[0].listings);
  });

});
