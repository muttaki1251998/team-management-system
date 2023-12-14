import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import EditPage from "./EditPage";

jest.mock("axios");

beforeAll(() => {
  // Mock the window.location object
  global.window = Object.create(window);
  const url = "http://localhost:3002/edit/123"; // Use a fake URL and ID
  Object.defineProperty(window, "location", {
    value: {
      href: url,
      pathname: url.substring(url.indexOf("/edit")),
    },
    writable: true,
  });
});

afterAll(() => {
  delete global.window;
});

const mockMemberData = {
  data: {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    role: "regular",
  },
};

describe("EditPage", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce(mockMemberData);
  });

  it("loads and displays member data", async () => {
    render(<EditPage />);
    expect(axios.get).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(
        screen.getByDisplayValue(mockMemberData.data.firstName)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(mockMemberData.data.lastName)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(mockMemberData.data.email)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(mockMemberData.data.phone)
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/Regular - Can't delete members/)
      ).toBeChecked();
    });
  });

  it("changes member info when input fields are edited", async () => {
    render(<EditPage />);
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("First Name"), {
        target: { value: "Jane" },
      });
      expect(screen.getByDisplayValue("Jane")).toBeInTheDocument();
    });
  });

  it("calls delete API when Delete is clicked", async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 });
    render(<EditPage />);
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });
  });
});
