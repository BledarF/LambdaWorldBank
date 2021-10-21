import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import UserRegistration from "./UserRegistration";

afterEach(() => {
  cleanup();
});

it("renders without crashing", () => {
  render(<UserRegistration />);
});

it("should have username, password, confirm password field and submit/register button", () => {
  render(<UserRegistration />);

  const username = screen.getByLabelText("Username:");
  const password = screen.getByLabelText("Password:");
  const confirmPassword = screen.getByLabelText("Confirm Password:");
  const registerButton = screen.getByText("Register");

  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(confirmPassword).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});

it("should allow the user to submit their credentials", () => {
  const submit = jest.fn();
  render(<UserRegistration submit={submit} />);

  const usernameField = screen.getByLabelText("Username:");
  const passwordField = screen.getByLabelText("Password:");
  const confirmPasswordField = screen.getByLabelText("Confirm Password:");
  const registerButton = screen.getByText("Register");

  userEvent.type(usernameField, "kobi@sigmalabs.xyz");
  userEvent.type(passwordField, "password1");
  userEvent.type(confirmPasswordField, "password1");
  userEvent.click(registerButton);

  expect(submit).toHaveBeenCalledWith(
    "kobi@sigmalabs.xyz",
    "password1",
    "password1"
  );
});

// it("should display password error: password shorter than 8 characters", () => {
//   const submit = jest.fn();
//   render(<UserRegistration submit={submit} />);

//   const usernameField = screen.getByLabelText("Username");
//   const passwordField = screen.getByLabelText("Password");
//   const confirmPasswordField = screen.getByLabelText("Confirm Password");
//   const registerButton = screen.getByText("Register");
//   const error = <p>Password does not exceed 8 characters. Please try again.</p>;
//   act(() => {
//     userEvent.type(usernameField, "kobi@sigmalabs.xyz");
//     userEvent.type(passwordField, "pass");
//     userEvent.type(confirmPasswordField, "pass");
//     userEvent.click(registerButton);
//   });
//   const value = document.find("p").text();
//   expect(value).toEqual(
//     "Password does not exceed 8 characters. Please try again."
//   );

//   //   expect(
//   //     screen.getByText("Password does not exceed 8 characters. Please try again.")
//   //   ).toBeInTheDocument();
// });
