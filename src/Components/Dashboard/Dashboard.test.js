import React from "react";
import { render, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import "@testing-library/jest-dom";
import { BrowserRouter } from 'react-router-dom';

describe("Test", () => {
  beforeEach(() => {

  });

  it.skip("should display the locations info", async () => {

    const { getByText, debug} = render(
      <BrowserRouter>
        <Dashboard

        />
      </BrowserRouter>
    );

  });
});
