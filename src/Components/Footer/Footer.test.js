import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Footer", () => {});

it("Should render the component to the page", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Footer />
      </BrowserRouter>
    );

    const footerEl = getByText('Built by:');
    expect(footerEl).toBeInTheDocument();

});
