import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ListPage from "./ListPage";

jest.mock("axios");
const mockTeamMembers = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@instawork.com",
    phone: "415-310-1619",
    role: "admin",
  },
  {
    _id: "2",
    firstName: "Charlene",
    lastName: "Pham",
    email: "charlene@instawork.com",
    phone: "415-310-1619",
    role: "regular",
  },
  {
    _id: "3",
    firstName: "Mark",
    lastName: "Hamil",
    email: "mark@instawork.com",
    phone: "415-310-1619",
    role: "regular",
  },
];

describe("ListPage", () => {
  // Resets the mock before each test
  beforeEach(() => {
    axios.get.mockClear();
  });

  it("fetches and displays team members", async () => {
    // Mock the axios.get function to resolve with mock data
    axios.get.mockResolvedValue({ data: mockTeamMembers });

    render(<ListPage />);
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/api/members/get-members"
    );
    await waitFor(() => {
      mockTeamMembers.forEach((member) => {
        const nameWithRoleRegex = new RegExp(
          `${member.firstName} ${member.lastName}( \\(admin\\))?`,
          "i"
        );
        expect(screen.getByText(nameWithRoleRegex)).toBeInTheDocument();
      });
    });
  });

  it("navigates to add member page when the + button is clicked", () => {
    // Set up a mock function to simulate window.location.href behavior
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: "" };
    // Mock the axios.get function to resolve with mock data
    axios.get.mockResolvedValue({ data: mockTeamMembers });
    render(<ListPage />);
    screen.getByText("+").click();
    expect(window.location.href).toBe("http://localhost:3001/");
    window.location = originalLocation;
  });
});
