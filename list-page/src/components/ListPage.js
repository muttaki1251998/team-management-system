import React, { useState, useEffect } from "react";
import axios from "axios";

const ListPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/members/get-members"
        );
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleEditMemberClick = (memberId) => {
    window.location.href = `http://localhost:3002/edit/${memberId}`;
  };
  const navigateToAddMember = () => {
    window.location.href = "http://localhost:3001/";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white p-8 rounded-lg shadow-lg h-[530px] w-full max-w-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-1 text-gray-800">Team members</h2>
        <p className="text-sm text-gray-500 mb-6">
          You have {teamMembers.length} team members.
        </p>
        <button
          className="absolute top-8 right-8 text-blue-500 text-4xl"
          onClick={navigateToAddMember}
        >
          +
        </button>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow mb-4"
              onClick={() => handleEditMemberClick(member._id)}
            >
              <img
                className="h-10 w-10 rounded-full mr-4"
                src="https://via.placeholder.com/40"
                alt={`${member.firstName} ${member.lastName}`}
              />
              <div className="flex-grow">
                <p className="text-lg font-bold text-gray-900">
                  {`${member.firstName} ${member.lastName}`}
                  {member.role === "admin" && " (admin)"}
                </p>
                <p className="text-gray-700">{member.phone}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
