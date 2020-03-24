import React from "react";
import Login from "./Login";
import { render, fireEvent } from "@testing-library/react";

describe("Login", () => {
  it("sends the correct data up to app via addIdea", () => {
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
});
