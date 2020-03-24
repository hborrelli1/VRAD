import React from "react";
import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";

describe("Login", () => {
  it("sends the correct data up to app via Login", () => {
    const mockLogin = jest.fn();
    const { debug, getByPlaceholderText, getByText } = render(
      <Login login={mockLogin} />
    );

    fireEvent.change(getByPlaceholderText("User Name"), {
      target: { value: "fakeUser" }
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "fakeUser@gmail.com" }
    });
    fireEvent.click(getByText("Login"));
    expect(mockLogin).toHaveBeenCalledWith({
      userName: "fakeUser",
      email: "fakeUser@gmail.com",
      purpose: ""
    });
  });
  it("Should check if the username length is longer than 5 char", () => {
    const { debug, getByPlaceholderText, getByText } = render(
      <Login login={mockLogin} />
    );

    fireEvent.change(getByPlaceholderText("User Name"), {
      target: { value: "fake" }
    });


  });

  it("Should check if the email is not valid", () => {
    const { debug, getByPlaceholderText, getByText } = render(
      <Login login={mockLogin} />
    );

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "fakeUser" }
    });

  });
});
