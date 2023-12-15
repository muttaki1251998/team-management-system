import React, { useState } from "react";
import axios from "axios";
const AddTeamMember = () => {
  const [memberInfo, setMemberInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "regular",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the memberinfo state with proper values
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });

    // Update the errors state to clear the error message
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Validation
  const validateInput = () => {
    let tempErrors = {};

    // Check for empty fields
    if (memberInfo.firstName.trim().length === 0) {
      tempErrors.firstName = "First name is required.";
    }
    if (memberInfo.lastName.trim().length === 0) {
      tempErrors.lastName = "Last name is required.";
    }
    if (memberInfo.email.trim().length === 0) {
      tempErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(memberInfo.email) // Checking if email is in proper format
    ) {
      tempErrors.email = "Invalid email address.";
    }
    if (memberInfo.phone.trim().length === 0) {
      tempErrors.phone = "Phone number is required.";
    }
    setErrors(tempErrors);

    // Return True if no errors are present else return False
    return Object.keys(tempErrors).length === 0;
  };

  // Handle the change of radio button associated with admin and regular option
  const handleRoleChange = (e) => {
    setMemberInfo({
      ...memberInfo,
      role: e.target.id,
    });
  };

  const handleSubmit = async () => {
    if (validateInput()) {
      console.log("Validated Data:", memberInfo);
      const apiUrl = "http://localhost:8000/api/members/add-member";
      try {
        const response = await axios.post(apiUrl, memberInfo);
        // Clear the fields
        setMemberInfo({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          role: "regular",
        });
        // Redirect to ListPage
        window.location.href = "http://localhost:3003/";
      } catch (error) {
        console.error("Failed to add member:", error.response.data);
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg h-[530px] w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-gray-800">
          Add a team member
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Set email, location and role.
        </p>
        <legend className="text-gray-700 text-sm font-bold mb-2">Info</legend>
        <div className="mb-4">
          <input
            className={`shadow appearance-none border ${
              errors.firstName
                ? "border-red-500 shadow-outline-red"
                : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={memberInfo.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">{errors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            className={`shadow appearance-none border ${
              errors.lastName
                ? "border-red-500 shadow-outline-red"
                : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={memberInfo.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">{errors.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            className={`shadow appearance-none border ${
              errors.email
                ? "border-red-500 shadow-outline-red"
                : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={memberInfo.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            className={`shadow appearance-none border ${
              errors.phone
                ? "border-red-500 shadow-outline-red"
                : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none`}
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone"
            value={memberInfo.phone}
            onChange={handleInputChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic">{errors.phone}</p>
          )}
        </div>
        <fieldset className="mb-4">
          <legend className="text-gray-700 text-sm font-bold mb-2">Role</legend>
          <div className="flex items-center mb-2">
            <input
              id="regular"
              type="radio"
              name="role"
              checked={memberInfo.role === "regular"}
              onChange={handleRoleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="regular"
              className={`ml-2 block text-sm ${
                memberInfo.role === "regular"
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              Regular - Can't delete members
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="admin"
              type="radio"
              name="role"
              checked={memberInfo.role === "admin"}
              onChange={handleRoleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="admin"
              className={`ml-2 block text-sm ${
                memberInfo.role === "admin" ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Admin - Can delete members
            </label>
          </div>
        </fieldset>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMember;
