import React from "react";
import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from 'react-router-dom';


describe("Login", () => {
  it("sends the correct data up to app via Login", () => {
    const mockLogin = jest.fn();
    const { debug, getByPlaceholderText, getByText,getByLabelText  } = render(<BrowserRouter><Login login={mockLogin} /></BrowserRouter>);

    fireEvent.change(getByPlaceholderText("User Name"), {
      target: { value: "fakeUser" }
    });
    fireEvent.change(getByPlaceholderText("Email@provider.com"), {
      target: { value: "fakeUser@gmail.com" }
    });
    fireEvent.change(getByLabelText("purpose of travel"), {
      target: { value: "buisness" }
    });
    fireEvent.click(getByText("Login"));
    expect(mockLogin).toHaveBeenCalledWith({
      name: "fakeUser",
      email: "fakeUser@gmail.com",
      purpose: "buisness"
    });
  });

  it("Should not send anything if data is wrong", () => {
    const mockLogin = jest.fn();
    const { debug, getByPlaceholderText, getByText } = render(
      <Login login={mockLogin} />
    );

    fireEvent.change(getByPlaceholderText("User Name"), {
      target: { value: "fake" }
    });
    fireEvent.change(getByPlaceholderText("Email@provider.com"), {
      target: { value: "fakeUser@gmailcom" }
    });
    fireEvent.click(getByText("Login"));
    expect(mockLogin).toHaveBeenCalledTimes(0);
  });

  it("Should check if the name length is longer than 5 char", () => {
    const { debug, getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.change(getByPlaceholderText("User Name"), {
      target: { value: "fake" }
    });
    expect(
      getByText("User Name must be 5 characters long!")
    ).toBeInTheDocument();
  });

  it("Should check if the email is not valid", () => {
    const { debug, getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.change(getByPlaceholderText("Email@provider.com"), {
      target: { value: "fakeUser" }
    });
    expect(getByText("Email is not valid!")).toBeInTheDocument();
  });
});
