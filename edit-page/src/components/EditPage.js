import React, { useState, useEffect } from "react";
import axios from "axios";
import './EditPage.css';

const EditPage = () => {
  const [memberInfo, setMemberInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "regular",
  });

  useEffect(() => {
    const id = window.location.pathname.split("/edit/")[1];
    axios
      .get(`http://localhost:8000/api/members/get-member/${id}`)
      .then((response) => {
        setMemberInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching member details:", error);
      });
  }, []);

const handleInputChange = (e) => {
  const { name, value, type } = e.target;
  if (type === "radio") {
    setMemberInfo({ ...memberInfo, role: value });
  } else {
    setMemberInfo({ ...memberInfo, [name]: value });
  }
};

  const handleSave = async () => {
    const id = window.location.pathname.split("/edit/")[1];
    const apiUrl = `http://localhost:8000/api/members/update-member/${id}`;
    try {
      const response = await axios.put(apiUrl, memberInfo);
      // Redirect to ListPage
      window.location.href = "http://localhost:3003/";
    } catch (error) {
      console.log("Failed to save member:", error);
    }
  };

  const handleDelete = async () => {
    const id = window.location.pathname.split("/edit/")[1];
    const apiUrl = `http://localhost:8000/api/members/delete/${id}`;
    // Redirect to ListPage
    window.location.href = "http://localhost:3003/";
    try {
      const response = await axios.delete(apiUrl);
    } catch (error) {
      console.log("Failed to delete member:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg h-[530px] w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-gray-800">
          Edit team member
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Edit contact info, location and role.
        </p>
        <div className="space-y-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={memberInfo.firstName}
            onChange={handleInputChange}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            value={memberInfo.lastName}
            onChange={handleInputChange}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={memberInfo.email}
            onChange={handleInputChange}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone"
            value={memberInfo.phone}
            onChange={handleInputChange}
          />
          <fieldset>
            <legend className="text-gray-700 text-sm font-bold mb-2">
              Role
            </legend>
            <div className="flex items-center mb-2">
              <input
                id="regular"
                type="radio"
                name="role"
                value="regular"
                checked={memberInfo.role === "regular"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor="regular"
                className="ml-2 block text-sm text-gray-700"
              >
                Regular - Can't delete members
              </label>
            </div>
            <div className="flex items-center mb-2">
              <input
                id="admin"
                type="radio"
                name="role"
                value="admin"
                checked={memberInfo.role === "admin"}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label
                htmlFor="admin"
                className="ml-2 block text-sm text-gray-700"
              >
                Admin - Can delete members
              </label>
            </div>
          </fieldset>
          <div className="mt-6 flex justify-between">
            <button
              className="button-delete"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
