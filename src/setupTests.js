import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import UserList from './UserList';

describe("LoginForm component", () => {
  it("renders without crashing", () => {
    render(<LoginForm />);
  });

  it("displays error message when login fails", async () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.submit(emailInput);

    await waitFor(() => {
      expect(getByText("Invalid username/password")).toBeInTheDocument();
    });
  });

  it("submits login form successfully", async () => {
    // Mocking fetch API
    const mockFetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ token: "mockToken" }),
    });
    global.fetch = mockFetch;

    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.submit(emailInput);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password",
        }),
      });
      expect(localStorage.getItem("token")).toBe("mockToken");
      expect(getByText("Login successful!")).toBeInTheDocument();
    });
  });
});





// USerList test cases

describe('UserList component', () => {
    it('renders without crashing', () => {
      render(<UserList />);
    });
  
    it('displays error message when fetching users fails', async () => {
      // Mocking fetch API
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch users'));
  
      const { getByText } = render(<UserList />);
      await waitFor(() => {
        expect(getByText('Error fetching users: Failed to fetch users')).toBeInTheDocument();
      });
    });
  
    it('fetches and displays users successfully', async () => {
      // Mocking fetch API
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ data: [{ id: 1, email: 'user1@example.com' }, { id: 2, email: 'user2@example.com' }] }),
      });
  
      const { getByText, getAllByRole } = render(<UserList />);
      await waitFor(() => {
        expect(getByText('User List')).toBeInTheDocument();
        expect(getAllByRole('row').length).toBe(3); // Header row + 2 user rows
        expect(getByText('ID')).toBeInTheDocument();
        expect(getByText('Email')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('user1@example.com')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('user2@example.com')).toBeInTheDocument();
      });
    });
  
    it('does not fetch users if token is not available', async () => {
      // Mocking localStorage.getItem to return null
      jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce(null);
  
      // Mocking fetch API
      const fetchMock = jest.fn();
      global.fetch = fetchMock;
  
      render(<UserList />);
  
      await waitFor(() => {
        expect(fetchMock).not.toHaveBeenCalled();
      });
    });
  });