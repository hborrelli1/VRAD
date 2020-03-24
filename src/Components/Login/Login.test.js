import React from "react";
import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Login", () => {
  it("sends the correct data up to app via Login", () => {
    const mockLogin = jest.fn();
    const { debug, getByPlaceholderText, getByText } = render(
      <Login login={mockLogin} />
    );

    fireEvent.change(getByPlaceholderText("User Name"), {
      target: { value: "fakeUser" }
    });
    fireEvent.change(getByPlaceholderText("Email@provider.com"), {
      target: { value: "fakeUser@gmail.com" }
    });
    fireEvent.click(getByText("Login"));
    expect(mockLogin).toHaveBeenCalledWith({
      name: "fakeUser",
      email: "fakeUser@gmail.com",
      purpose: ""
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
