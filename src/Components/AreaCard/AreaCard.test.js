import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AreaCard from './AreaCard';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe("Test", () => {
  let area;

  beforeEach(() => {
    area = {
      "id": 590,
      "name": "River North",
      "nickName": "RiNo",
      "details": "/api/v1/areas/590",
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
  });

  it('should display the areas info', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AreaCard
          areaInfo={area}
          />
      </BrowserRouter>
    );

    const areaNameEl = getByText("River North - (RiNo)");
    const areaLocationEl = getByText("North of Downtown Denver");
    const areaDescriptionEl = getByText("RiNo is a burgeoning area with new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!");
    const areaButtonEl = getByText("View 6 Listings in RiNo");

    expect(areaNameEl).toBeInTheDocument();
    expect(areaLocationEl).toBeInTheDocument();
    expect(areaDescriptionEl).toBeInTheDocument();
    expect(areaButtonEl).toBeInTheDocument();
  });

  it('should be able to change views', () => {
    const mockChangeView = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <AreaCard
          areaInfo={area}
          changeView={mockChangeView}
          />
      </BrowserRouter>
    );
    const areaButtonEl = getByText('View 6 Listings in RiNo');

    fireEvent.click(areaButtonEl);

    expect(mockChangeView).toHaveBeenCalledTimes(1);
    expect(mockChangeView).toHaveBeenCalledWith('LocationContainer', "/api/v1/areas/590",["/api/v1/listings/3", "/api/v1/listings/44", "/api/v1/listings/221", "/api/v1/listings/744", "/api/v1/listings/90", "/api/v1/listings/310"]);
  });

})
