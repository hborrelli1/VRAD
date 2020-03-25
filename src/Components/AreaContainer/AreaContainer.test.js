import React from 'react';
import { render } from '@testing-library/react';
import AreaContainer from './AreaContainer';
import '@testing-library/jest-dom';

describe("AreaContainer", () => {
  it("should display a list of areas", () => {
    const areaData = [
      {
          "area": "RiNo",
          "details": "/api/v1/areas/590"
      },
      {
          "area": "Park Hill",
          "details": "/api/v1/areas/751"
      }
    ]

    const { getByText } = render(
      <AreaContainer areas={areaData} />
    )

    const areaEl1 = getByText('RiNo');
    const areaEl2 = getByText('Park Hill');

    expect(areaEl1).toBeInTheDocument();
    expect(areaEl2).toBeInTheDocument();
  });

});
