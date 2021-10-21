import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import UserLogin from "./UserLogin";

it("renders without crashing", () => {
  render(<UserLogin />);
});

it("should have username, password input fields, and login button", () => {
  render(<UserLogin />);

  const username = screen.getByLabelText("Username:");
  const password = screen.getByLabelText("Password:");
  const loginButton = screen.getByText("Login");

  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

it("should allow the user to submit their credentials", () => {
  const submit = jest.fn();
  render(<UserLogin submit={submit} />);

  const usernameField = screen.getByLabelText("Username:");
  const passwordField = screen.getByLabelText("Password:");
  const loginButton = screen.getByText("Login");

  userEvent.type(usernameField, "kobi@sigmalabs.xyz");
  userEvent.type(passwordField, "password1");
  userEvent.click(loginButton);

  expect(submit).toHaveBeenCalledWith("kobi@sigmalabs.xyz", "password1");
});
